# wizard-preview Specification

## Purpose

Live preview panel that reflects in-progress resume data. Properly scaled using CSS containment (no `scale-[0.85]`). Shows empty-state sample data when fields are unfilled.

## Requirements

### Requirement: Live Preview Rendering

The preview panel SHALL render the selected template component with current Zustand resume data. It SHALL update on every state change without requiring a manual refresh action.

#### Scenario: Typing in form updates preview instantly

- GIVEN user is on step 1 with empty fullName
- WHEN user types "Jane Doe" in the form field
- THEN the preview panel SHALL display "Jane Doe" within 500ms

#### Scenario: Preview reflects multiple sections

- GIVEN user completed Personal Info and Experience sections
- WHEN user views the preview panel
- THEN the preview SHALL render name, contact info, AND work experience entries

### Requirement: CSS-Based Scaling

The preview SHALL use CSS containment (`contain: layout style` on a container) to scale the A4-sized resume template to fit the panel width. The scaling SHALL NOT use Tailwind arbitrary values like `scale-[0.85]`.

#### Scenario: Preview fits panel at desktop width

- GIVEN desktop viewport (>= 1024px)
- WHEN wizard renders with 3-column layout
- THEN the preview SHALL fill the right column without overflow

### Requirement: Empty-State Sample Data

When a section has no user data, the preview SHALL render placeholder content to demonstrate the template layout. Placeholder text SHALL be visually distinct (e.g., italic, muted color) from real user data.

#### Scenario: Empty Education section shows placeholder

- GIVEN resume has no education entries
- WHEN user views the preview panel
- THEN the Education section SHALL render sample text (e.g., "Your degree here") in muted styling

#### Scenario: Filled field replaces placeholder

- GIVEN name field has "Jane Doe"
- WHEN preview renders
- THEN the name SHALL NOT display as placeholder text
- AND the name SHALL render with normal template styling

### Requirement: Responsive Panel Behavior

On viewport < 1024px, the preview panel SHALL toggle via a button. On viewport < 768px, it SHALL render as a floating panel or modal accessible via FAB.

#### Scenario: Tablet collapses preview behind toggle

- GIVEN viewport width is 768px
- WHEN wizard loads
- THEN preview SHALL be hidden by default with a "Show Preview" button visible

### Non-Functional Requirements

- Preview rerenders SHALL not cause form input focus loss
- Template component loading SHALL be lazy (React.lazy or Next.js dynamic)
- Sample data SHALL not be persisted to Zustand store
