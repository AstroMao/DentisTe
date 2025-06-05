# **Pocketbase Backend: Collections Overview for Dental Clinic POS**

This document outlines the Pocketbase collections designed for the Dental Clinic Point of Sale (POS) and management system. It details the purpose of each collection and how they are intended to be used during frontend integration.  
We have defined the following core collections, building upon Pocketbase's built-in users collection:

1. **users (Pocketbase Built-in, Extended)**  
   * **Purpose:** Manages system login credentials and basic user identification.  
   * **Key Custom Fields:**  
     * name (Text): Full name of the user.  
     * user\_type (Select: "Staff", "Dentist", "Owner/Admin"): Differentiates user roles at a high level, determining which profile collection they link to.  
     * avatar (File, Optional): Profile picture.  
   * **Frontend Usage:**  
     * User authentication (login/logout) via email/username and password.  
     * The user\_type will be checked after login to potentially fetch more detailed profile information from staff\_profiles or dentist\_profiles.  
     * Used to identify who created or modified records throughout the system (e.g., created\_by\_user fields in other collections).  
2. **staff\_profiles**  
   * **Purpose:** Stores detailed information specific to non-dentist staff members.  
   * **Key Fields:**  
     * user\_account (Relation to users where user\_type="Staff", **Required, Unique**): Links this profile to a login account.  
     * staff\_id\_number (Text): Internal staff ID.  
     * job\_title (Text): E.g., "Receptionist", "Clinic Manager".  
   * **Frontend Usage:**  
     * Accessed after a staff member logs in to display their specific details or manage staff-related information (if the logged-in user has permission).  
     * May be used to assign tasks or filter views based on job title.  
3. **dentist\_profiles**  
   * **Purpose:** Stores detailed information specific to dentists.  
   * **Key Fields:**  
     * user\_account (Relation to users where user\_type="Dentist", **Required, Unique**): Links to a login account.  
     * license\_number (Text): Official license number.  
     * specialization (Text): E.g., "General Dentistry", "Orthodontics".  
   * **Frontend Usage:**  
     * Accessed after a dentist logs in.  
     * Used when assigning dentists to appointments.  
     * Used to log which dentist performed a specific service in performed\_services.  
4. **patients**  
   * **Purpose:** Core collection for all patient demographic and general medical/dental information.  
   * **Key Fields:**  
     * name\_first, name\_last (Text, Required)  
     * date\_of\_birth (Date)  
     * contact\_phone\_primary (Text)  
     * medical\_history\_summary, dental\_history\_summary (Editor/Long Text)  
   * **Frontend Usage:**  
     * Creating new patient records (AddPatientPage.tsx).  
     * Displaying a list of all patients (PatientsListPage.tsx).  
     * Viewing and editing individual patient details (PatientDetailPage.tsx, EditPatientPage.tsx).  
     * Linking to appointments, performed services, and invoices.  
5. **patient\_tooth\_conditions**  
   * **Purpose:** Detailed dental charting for each patient, recording conditions, observations, and history for individual teeth or surfaces.  
   * **Key Fields:**  
     * patient (Relation to patients, Required)  
     * tooth\_code (Text, Required, e.g., "11", "48" using FDI or Universal system)  
     * surface\_codes (JSON Array of Text, Optional, e.g., \["M", "O", "D"\])  
     * condition\_observation (Text, Required, e.g., "Caries", "Existing Filling")  
     * date\_recorded (Date, Required)  
     * recorded\_by (Relation to users \- dentists)  
   * **Frontend Usage:**  
     * Displaying a visual dental chart on the patient's detail page.  
     * Allowing dentists to add new findings or update existing conditions for specific teeth during an examination or treatment.  
     * Informing treatment planning.  
6. **appointments**  
   * **Purpose:** Manages all scheduled patient visits.  
   * **Key Fields:**  
     * patient (Relation to patients, Required)  
     * appointment\_datetime (Date, Required)  
     * dentist\_assigned (Relation to dentist\_profiles, Optional)  
     * service\_description (Text, summary of reason for visit)  
     * status (Select: "Scheduled", "Completed", "Cancelled", "No Show")  
   * **Frontend Usage:**  
     * Scheduling new appointments.  
     * Displaying appointments in a calendar or list view (AppointmentsPage.tsx).  
     * Updating appointment status (e.g., marking as "Completed").  
     * Linking to performed\_services for treatments done during the appointment.  
7. **services**  
   * **Purpose:** Defines all billable (and potentially non-billable) procedures and services offered by the clinic.  
   * **Key Fields:**  
     * service\_code (Text, Optional, e.g., ADA codes)  
     * name (Text, Required, e.g., "Tooth Extraction \- Surgical")  
     * default\_price (Number, Required)  
     * is\_tooth\_specific (Bool): Indicates if the service applies to specific teeth.  
     * category (Select)  
   * **Frontend Usage:**  
     * Selecting services when logging treatments in performed\_services.  
     * Populating descriptions and default prices when creating invoice line items.  
     * Management interface in ServicesPage.tsx to add/edit services.  
8. **inventory**  
   * **Purpose:** Tracks consumable items and materials.  
   * **Key Fields:**  
     * item\_name (Text, Required)  
     * quantity\_on\_hand (Number, Required)  
     * minimum\_stock\_level (Number, Optional)  
     * unit\_of\_measure (Text, e.g., "cartridge", "box")  
     * cost\_per\_unit (Number, Optional)  
   * **Frontend Usage:**  
     * Viewing current stock levels (InventoryPage.tsx).  
     * Updating stock quantities (manually or potentially automatically via performed\_services).  
     * Alerting when stock is low (future enhancement).  
9. **service\_inventory\_requirements (Join Collection)**  
   * **Purpose:** Links Services to Inventory to define materials typically consumed for a specific service.  
   * **Key Fields:**  
     * service (Relation to Services, Required)  
     * inventory\_item (Relation to Inventory, Required)  
     * quantity\_required (Number, Required)  
   * **Frontend Usage:**  
     * Primarily a backend reference for inventory deduction logic.  
     * Could be used in the frontend on a service detail page to show typical materials.  
     * When a service is logged as performed, this collection helps identify which inventory items to potentially deduct.  
10. **performed\_services (Clinical Log)**  
    * **Purpose:** Acts as a detailed clinical log for every service/treatment rendered to a patient during an appointment. This is the source for billing.  
    * **Key Fields:**  
      * patient (Relation to patients, Required)  
      * appointment (Relation to appointments, Required)  
      * service (Relation to services, Required)  
      * dentist\_performing (Relation to dentist\_profiles, Required)  
      * teeth\_involved (JSON Array of Text, if service.is\_tooth\_specific is true)  
      * surfaces\_involved\_on\_teeth (JSON Object, Optional)  
      * unit\_price\_charged (Number, defaults from service.default\_price but can be overridden)  
      * date\_performed (Date, Required)  
      * billed\_in\_invoice\_item (Relation to invoice\_items, Optional, One-to-One)  
    * **Frontend Usage:**  
      * Form for dentists/staff to log treatments after/during an appointment, including selecting the service, patient, dentist, and importantly, the specific tooth/teeth involved.  
      * Provides the raw data for generating invoice line items.  
      * Viewing treatment history for a patient.  
11. **invoices**  
    * **Purpose:** Represents the financial bill issued to a patient.  
    * **Key Fields:**  
      * invoice\_number (Text, Unique, Required)  
      * patient (Relation to patients, Required)  
      * invoice\_date (Date, Required)  
      * total\_amount\_due (Number, Calculated)  
      * amount\_paid (Number, Default 0\)  
      * status (Select: "Draft", "Sent", "Paid", "Overdue", "Void")  
    * **Frontend Usage:**  
      * Generating new invoices (BillingPage.tsx).  
      * Listing and viewing existing invoices.  
      * Updating invoice status and recording payments.  
12. **invoice\_items**  
    * **Purpose:** Individual line items on an invoice, typically derived from performed\_services.  
    * **Key Fields:**  
      * invoice (Relation to invoices, Required)  
      * performed\_service\_entry (Relation to performed\_services, Recommended)  
      * service\_description\_override (Text, Optional)  
      * quantity (Number)  
      * unit\_price (Number)  
      * line\_item\_total (Number, Calculated)  
    * **Frontend Usage:**  
      * Automatically populated when an invoice is generated from one or more performed\_services entries.  
      * Displayed on the invoice detail view.  
      * Allows for manual addition of ad-hoc items if necessary (though linking to performed\_services is preferred for traceability).

This schema provides a robust foundation for your dental clinic application, allowing for detailed patient care records, efficient scheduling, accurate billing, and basic inventory management. The frontend will interact with these collections via the Pocketbase JS SDK to perform CRUD (Create, Read, Update, Delete) operations and display information.