Okay, นาย, I can certainly lay out that development plan again, focusing on a step-by-step progression from the very first feature to the last. Here’s a structured approach:

**Phase 0: Foundation & Final Touches (Get Ready to Build)**

1.  **Step 0.1: Verify Project Setup (You're mostly here!)**
    * Ensure Vite, React, TypeScript, Tailwind CSS v4, and shadcn/ui are all working together smoothly. [cite: astromao/dentiste/DentisTe-417c71ce9dd44f104e6a91466fd06dfc457ee3c0/package.json, astromao/dentiste/DentisTe-417c71ce9dd44f104e6a91466fd06dfc457ee3c0/vite.config.ts, astromao/dentiste/DentisTe-417c71ce9dd44f104e6a91466fd06dfc457ee3c0/components.json]
    * Confirm your Pocketbase server is accessible at `http://10.1.1.3`.
2.  **Step 0.2: Finalize Tailwind Configuration**
    * Create/confirm your `tailwind.config.ts` (or `.js`) with correct `content` paths and the `tailwindcss-animate` plugin (install if needed: `npm install -D tailwindcss-animate`).
3.  **Step 0.3: Integrate Pocketbase JavaScript SDK**
    * Install: `npm install pocketbase`.
    * Create `src/lib/pocketbase.ts` to initialize and export the `pb` client pointing to `http://10.1.1.3`.
4.  **Step 0.4: Basic Application Shell & Routing**
    * Clean `src/App.tsx`.
    * Set up main routes using `react-router-dom` (e.g., `/login`, `/dashboard`, `/patients`, `/appointments`, `/billing`).
    * Create a very basic layout component (e.g., a placeholder for a navigation bar and main content area).

**Phase 1: User Authentication (Secure Access First)**

*Goal: Only authorized staff can use the system.*

1.  **Step 1.1: Pocketbase User Setup**
    * In your Pocketbase Admin UI, review the `users` collection.
    * Add a `role` field (e.g., text field with options like "admin", "staff", "dentist"). Create a test admin user.
2.  **Step 1.2: Login Page & Logic**
    * Create a `LoginPage.tsx` component with email/password fields.
    * Implement `handleLogin` function using `pb.collection('users').authWithPassword(...)`.
    * On successful login, store user data/token (e.g., in React Context or Zustand) and navigate to a dashboard.
3.  **Step 1.3: Logout & Auth State**
    * Implement a logout button/function that clears the auth state (`pb.authStore.clear()`) and navigates to login.
4.  **Step 1.4: Protected Routes**
    * Create a `ProtectedRoute` component that checks auth state and redirects unauthenticated users to `/login`. Apply this to all non-login routes.

**Phase 2: Patient Records (The Core Information Hub)**

*Goal: Add, view, list, and edit patient information digitally.*

1.  **Step 2.1: Pocketbase `patients` Collection**
    * In Pocketbase Admin UI, create `patients` collection.
    * Fields: `name` (text, required), `date_of_birth` (date), `gender` (select: Male, Female, Other), `contact_phone` (text), `contact_email` (email), `address` (text), `medical_history_notes` (editor/long text), `dental_history_notes` (editor/long text), `registration_date` (date, auto-filled on create).
    * Set API Rules: e.g., `@request.auth.id != "" && @request.auth.role = "staff"` can create/read/update.
2.  **Step 2.2: Add New Patient Form**
    * Create `AddPatientPage.tsx` with a form using shadcn/ui components for all patient fields.
    * On submit, use `pb.collection('patients').create(...)`.
3.  **Step 2.3: Patient List Page**
    * Create `PatientsListPage.tsx`.
    * Fetch all patients using `pb.collection('patients').getList(...)`.
    * Display in a shadcn/ui Table. Include columns for key info (Name, Phone, DOB) and a link/button to view details.
    * Add a simple search input (filter client-side initially, or server-side later).
4.  **Step 2.4: Patient Detail View**
    * Create `PatientDetailPage.tsx` (e.g., route `/patients/:id`).
    * Fetch single patient data using `pb.collection('patients').getOne(id, ...)`.
    * Display all patient details.
5.  **Step 2.5: Edit Patient Form**
    * On `PatientDetailPage.tsx`, add an "Edit" button.
    * Create `EditPatientPage.tsx` (or a modal form) pre-filled with patient data.
    * On submit, use `pb.collection('patients').update(id, ...)`.

**Phase 3: Appointment Scheduling (Managing Clinic Flow)**

*Goal: Schedule, view, and manage patient appointments.*

1.  **Step 3.1: Pocketbase `appointments` Collection**
    * Create `appointments` collection.
    * Fields: `patient` (relation to `patients`, required), `appointment_datetime` (date, required), `dentist_assigned` (text or relation to `users` if dentists are users with `role="dentist"`), `service_description` (text, required), `status` (select: Scheduled, Completed, Cancelled, No Show; default "Scheduled"), `notes` (editor/long text).
    * API Rules similar to patients.
2.  **Step 3.2: Create Appointment Form**
    * Create `CreateAppointmentPage.tsx`.
    * Form to select a patient (dropdown/search from `patients` collection), pick date/time, enter service, assign dentist (if applicable).
    * On submit, `pb.collection('appointments').create(...)`.
3.  **Step 3.3: View Appointments (Calendar/List)**
    * Create `AppointmentsPage.tsx`.
    * Fetch appointments.
    * Display:
        * **Option A (Simpler Start):** A list/table view, filterable by date/status.
        * **Option B (More Advanced):** Integrate a calendar component (e.g., `react-big-calendar` or a simpler one) to show appointments visually.
4.  **Step 3.4: View/Edit Appointment Details**
    * Allow clicking an appointment to see its details (modal or separate page).
    * Form to edit details (time, status, notes) using `pb.collection('appointments').update(...)`.
5.  **Step 3.5: Link Appointments to Patient Detail Page**
    * On `PatientDetailPage.tsx`, show a list of upcoming and past appointments for that patient.

**Phase 4: Billing & Invoicing (Tracking Finances)**

*Goal: Create invoices for services, track payments.*

1.  **Step 4.1: Pocketbase `services` Collection (Optional but Recommended)**
    * Create `services` collection: `service_code` (text, unique), `name` (text), `description` (text), `default_price` (number).
    * This helps standardize items for invoicing.
2.  **Step 4.2: Pocketbase `invoices` & `invoice_items` Collections**
    * `invoices`: `invoice_number` (text, unique, perhaps auto-generated), `patient` (relation to `patients`), `invoice_date` (date), `due_date` (date), `total_amount` (number), `amount_paid` (number, default 0), `status` (select: Draft, Sent, Paid, Overdue, Void).
    * `invoice_items`: `invoice` (relation to `invoices`), `service` (relation to `services` if used, else `description` (text)), `quantity` (number), `unit_price` (number), `item_total` (number).
    * API Rules.
3.  **Step 4.3: Create Invoice Functionality**
    * Create `CreateInvoicePage.tsx` or integrate into `AppointmentDetailPage` (for completed appointments).
    * Allow selecting a patient.
    * Form to add line items: select from `services` (if using) or manually enter description, quantity, price. Calculate `item_total` and overall `total_amount`.
    * On save, create records in `invoices` and `invoice_items` collections.
4.  **Step 4.4: Invoice List & View**
    * `InvoicesListPage.tsx`: Display all invoices, searchable/filterable.
    * `InvoiceDetailPage.tsx`: Show full invoice details.
5.  **Step 4.5: Record Payments & Update Invoice Status**
    * On `InvoiceDetailPage.tsx`, add functionality to record a payment, updating `amount_paid` and `status` of the invoice.
6.  **Step 4.6: Basic Print-Friendly Invoice**
    * Ensure `InvoiceDetailPage.tsx` has a clean layout that prints well from the browser (Ctrl+P / Cmd+P).

**Phase 5: Iterative Enhancements (Post-Core MVP)**

*Goal: Add value based on feedback and further needs.*

1.  **Step 5.1: Dashboard**
    * Create a `DashboardPage.tsx`.
    * Display key stats: e.g., today's appointments, recent patient registrations, count of overdue invoices.
2.  **Step 5.2: Advanced User Roles & UI Permissions**
    * Refine Pocketbase API rules based on user `role`.
    * Conditionally render UI elements/actions based on the logged-in user's role.
3.  **Step 5.3: Patient File Uploads**
    * On `PatientDetailPage.tsx`, allow uploading files (X-rays, documents) using Pocketbase file fields.
    * Display uploaded files.
4.  **Step 5.4: Basic Reporting**
    * Simple reports: e.g., list of patients by registration date, monthly revenue (sum of paid invoices).
5.  **Step 5.5: Treatment Planning Module**
    * A new section/collection to outline proposed treatments for patients, estimated costs, and status.
6.  **Step 5.6: UI/UX Polish**
    * Improve loading states, error handling, notifications.
    * Refine forms and table displays based on user feedback.
7.  **Step 5.7: Data Backup Strategy (Reminder)**
    * Establish a routine for backing up the Pocketbase data file.

This detailed step-by-step plan should give you a clear path. Remember to test each small step and commit your changes frequently!