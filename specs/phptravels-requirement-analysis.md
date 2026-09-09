# PHPTRAVELS Requirement Analysis

## Analysis Scope

- **System:** https://phptravels.net/
- **Observed on:** 2026-09-08
- **Primary users:** Customers, travel agents, and support staff
- **Observed modules:** Hotel stays, flights, visa services, customer accounts, agent onboarding, support and policy content
- **Environment note:** The site identifies itself as a demo/testing environment. Rates are simulated, payment gateways are sandbox-only, supplier API credentials are required for live data, and demo data may be reset.

## Requirement Summary

PHPTRAVELS is a travel-booking platform that lets users search and book hotels, flights, and visas. Users can compare options, review trip details, provide traveler information, complete sandbox payment, and receive a booking confirmation. The platform also supports customer authentication, password recovery, agent registration, support content, and refund-related information.

## Functional Requirements

### FR-01: Site Navigation and Common Experience

- The site shall provide access to Stays, Flights, Visa, login, customer signup, and agent signup.
- The site shall provide language and currency controls where available.
- The site shall expose Company, Support, Explore, legal-policy, and contact links.
- The site shall display responsive content suitable for desktop and mobile users.
- The site shall provide support contact channels, including email and WhatsApp links.
- The site shall display the demo-environment notice before or during use of booking functionality.

### FR-02: Hotel Search

- A user shall search by destination or hotel name.
- A user shall select check-in and check-out dates.
- A user shall select guests and rooms.
- A user shall select nationality when required for availability or booking.
- The system shall validate that the destination, dates, guest count, and room count are usable.
- The system shall return matching hotel properties and availability where supplier data exists.
- A user shall be able to modify search criteria from the results page.

### FR-03: Hotel Results and Selection

- Results shall show property name, location, rating where available, price, currency, discount, and relevant property imagery.
- A user shall open a property detail view.
- A user shall select an available room or rate.
- The system shall show applicable cancellation and refund conditions before checkout.
- The system shall preserve the selected dates, guests, rooms, nationality, property, room, and rate through checkout.
- The system shall prevent selection of unavailable or expired rates.

### FR-04: Flight Search

- A user shall choose One Way, Round Trip, or Multi-City.
- A user shall enter departure and arrival cities or airports.
- A user shall select departure and, when applicable, return dates.
- A user shall select passenger count and cabin class.
- The system shall validate route, date, passenger, and trip-type combinations.
- The system shall return available flight options when supplier data exists.

### FR-05: Flight Comparison and Review

- Flight results shall support comparison by fare and departure time.
- A user shall be able to filter results and inspect additional flight information.
- A user shall select a flight and continue to review.
- The review step shall show itinerary, fare, taxes or fees when available, passenger requirements, and optional extras.
- Optional extras may include hotels, cars, and travel insurance.
- The system shall revalidate price and availability before final booking.

### FR-06: Visa Search and Application

- A user shall select a departure country and destination country.
- A user shall select an application date.
- A user shall select visa type, such as Tourist Visa.
- A user shall select processing speed, such as Standard.
- A user shall select traveler count.
- The system shall validate that the countries differ where required and that the selected service is available.
- The system shall present the next step or available visa service after a valid search.

### FR-07: Checkout and Payment

- The checkout shall collect customer contact details and required traveler or passenger details.
- The system shall support details for every traveler included in the booking.
- The user shall review the complete order before payment.
- The user shall accept applicable terms and conditions before payment.
- The system shall show the selected payment method or available sandbox payment methods.
- The system shall prevent payment when required fields, terms acceptance, or booking validation are incomplete.
- On successful sandbox payment, the system shall create a booking and show a confirmation page.
- The confirmation shall include a booking reference and booking details where available.
- The system should send confirmation by email within the documented service window.

### FR-08: Customer Authentication

- A customer shall sign in using email address and password.
- Invalid credentials shall prevent authentication and show a user-facing error.
- A customer shall access the signup page from the login page.
- A customer shall request password-reset instructions using an email address.
- Password reset behavior shall not disclose whether an email address exists.

### FR-09: Customer Registration

- Signup shall collect first name, last name, email address, password, confirmation password, and the displayed security-check answer.
- Passwords shall meet the displayed minimum length of six characters.
- Password confirmation shall match the password.
- The user shall accept Terms of Service and Privacy Policy.
- Invalid or incomplete registration data shall be rejected with field-level feedback.
- A successfully registered user shall receive a clear success state and an appropriate next step.

### FR-10: Travel Agent Onboarding

- The site shall provide an agent signup path separate from customer signup.
- Agent onboarding shall support agency verification or approval as described by the site.
- An approved agent shall receive access to agent search, wholesale inventory, booking management, reports, and commission information where enabled.
- Agent features shall support client booking workflows and agent-specific support.
- The system shall communicate approval status and next steps to applicants.

### FR-11: Support, Claims, and Refund Information

- The site shall provide contact information and support channels.
- The site shall provide a file-a-claim path or instructions.
- Refund eligibility shall follow the supplier policy for flights, hotels, tours, transfers, car rentals, and packages.
- A refund request shall require a booking reference, service details, and cancellation reason.
- The system or support process shall communicate refund amount and expected processing timeline.
- Refunds shall be returned to the original payment method when approved.
- The site shall expose privacy, cookies, terms, refund, and travel-document policies.

## Positive Scenarios

- Search for a hotel by destination with valid future dates, two guests, and one room; open a result and continue to booking.
- Modify hotel dates or guest count from the results page and verify refreshed results reflect the new criteria.
- Select nationality when prompted and continue to the property or room selection step.
- Search a one-way flight with valid airports, date, passenger count, and cabin class; inspect and select a result.
- Search a round-trip flight and verify the return date is required and retained.
- Search a multi-city flight with valid segments and verify all segments are represented in review.
- Search a visa using valid countries, visa type, processing speed, date, and traveler count.
- Complete checkout with valid traveler details, accept terms, use a sandbox payment method, and verify confirmation.
- Register with valid customer data, matching passwords, correct security answer, and accepted policies.
- Sign in with an existing valid account and sign out or navigate to the authenticated area.
- Submit a password-reset request with a syntactically valid email address and verify a non-sensitive response.
- Navigate from the footer to contact, how-to-book, privacy, terms, and refund content.
- Open external support links and verify they use the intended target destination.

## Negative Scenarios

- Submit a hotel search without a destination.
- Submit a hotel search with a missing date, check-out before check-in, or equal check-in and check-out dates when not supported.
- Submit a hotel search with zero guests, zero rooms, or an unsupported room/guest combination.
- Continue hotel booking without selecting required nationality.
- Search a flight without departure or arrival, with the same airport for both, or with an invalid route.
- Submit a round-trip search without a return date or with a return date before departure.
- Submit a multi-city search with an incomplete segment.
- Search a visa without either country, with the same origin and destination where invalid, or without traveler count.
- Attempt to select an unavailable, expired, or changed-price hotel room or flight fare.
- Continue checkout with missing traveler details, malformed email, or invalid passenger data.
- Attempt payment without accepting terms and conditions.
- Submit an unsuccessful or interrupted sandbox payment and verify no duplicate booking is created.
- Register with missing fields, malformed email, a password shorter than six characters, mismatched passwords, or an incorrect security answer.
- Register with an email address that is already in use.
- Sign in with an unknown email, wrong password, empty credentials, or malformed email.
- Request a password reset with an empty or malformed email.
- Attempt to access customer or agent-only areas without authentication or approval.
- Submit unsupported or incomplete refund-request information.
- Follow broken, unauthorized, or unavailable policy and support links.

## Boundary Scenarios

- Minimum and maximum supported hotel guests, rooms, flight passengers, visa travelers, and agent/customer field lengths.
- Check-in today, check-in tomorrow, same-day booking, far-future dates, leap-day dates, and dates across a year boundary.
- A hotel search with the minimum valid stay and a long multi-night stay.
- One-way, round-trip, and the maximum supported number of multi-city segments.
- One traveler versus the maximum passenger count, including adult, child, and infant rules if supported.
- Six-character password exactly at the stated minimum and passwords containing spaces, symbols, and non-ASCII characters.
- Very long names, email local parts, booking references, and refund reasons.
- Zero-result searches, one-result searches, and large result sets with pagination or lazy loading.
- Price rounding, discount display, taxes, service fees, currency changes, and a price change between search and payment.
- Session timeout, browser refresh, back navigation, duplicate submit, and payment retry at each checkout step.
- Mobile viewport use, keyboard navigation, zoom, and screen-reader access for forms, dialogs, menus, and date pickers.

## Validation, Integration, and Security Scenarios

### Validation

- Verify required fields have clear, localized error messages near the invalid field.
- Verify client-side validation is backed by server-side validation.
- Verify date pickers prevent or clearly reject invalid date combinations.
- Verify numeric selectors reject negative, zero, decimal, and out-of-range values where not supported.
- Verify form errors do not erase valid user input unnecessarily.
- Verify loading, empty, error, retry, and success states for every search and booking request.

### Integration

- Supplier availability and price response is mapped correctly to hotel, flight, and visa results.
- Nationality and traveler details are passed to supplier or booking services correctly.
- Checkout revalidation catches stale inventory and changed price before payment.
- Payment gateway success, decline, timeout, cancellation, and duplicate-callback behavior is handled safely.
- Booking confirmation is persisted and linked to the payment transaction.
- Confirmation email is sent with the correct booking reference and itinerary.
- Refund request status and supplier response are reflected in the customer or support workflow.
- Agent bookings, commission data, and client details remain isolated from ordinary customer accounts.

### Security and Privacy

- Passwords are never exposed in page content, logs, URLs, or API responses.
- Authentication and password-reset endpoints resist account enumeration, brute force, and excessive requests.
- Session cookies use secure, HttpOnly, and appropriate SameSite attributes.
- Authorization prevents users from viewing or modifying another user’s booking, payment, traveler data, or refund request.
- Input fields resist injection, cross-site scripting, tampering, and unsafe file or URL handling.
- Payment card data is handled only by the approved sandbox gateway and is not stored by the application unless explicitly required and compliant.
- Terms, privacy, cookies, and refund consent are recorded with the booking where required.
- Personal data is minimized, transmitted over HTTPS, and removed or retained according to the published policy.
- External links, WhatsApp links, and email links open safely and do not leak sensitive booking information.

## Missing Requirements and Ambiguities

- Exact navigation labels and supported languages are not fully specified.
- Supported currencies, exchange-rate source, rounding rules, and currency persistence are unspecified.
- Exact hotel filters, sorting options, pagination behavior, and map functionality are unspecified.
- Flight baggage, fare rules, seat selection, traveler types, passport data, and ticketing rules are unspecified.
- Visa document upload requirements, eligibility rules, application status, interview requirements, and approval workflow are unspecified.
- Required checkout fields differ by service but the complete field matrix is not published.
- Supported payment methods, sandbox test credentials, 3-D Secure behavior, and payment retry rules are unspecified.
- Booking modification, cancellation, rebooking, no-show, and partial-refund user flows are not fully specified.
- Email delivery SLA, email templates, resend behavior, and notification failure handling are unspecified.
- Customer dashboard capabilities, booking history, profile editing, and saved traveler data are unspecified.
- Agent verification documents, approval SLA, commission calculation, credit limits, and agent permissions are unspecified.
- Accessibility conformance target, browser support matrix, mobile breakpoints, and localization behavior are unspecified.
- Rate limits, retention periods, audit-log requirements, and privacy-request workflows are unspecified.
- The site contains different contact details in observed areas; the authoritative support address and phone number need confirmation.
- The demo notice says data may reset, but no reset schedule, test-data isolation strategy, or stable seeded dataset is defined.

## Risks

- **High:** Simulated rates and periodically reset demo data can make booking and regression results non-repeatable.
- **High:** Sandbox payment behavior may differ from production payment flows, especially around declines, callbacks, and 3-D Secure.
- **High:** Supplier API availability and credentials determine whether results, prices, and confirmation flows can be exercised.
- **High:** Travel bookings handle personal, passport, payment, and itinerary data, creating significant privacy and authorization risk.
- **Medium:** Date-sensitive tests can fail as the current date changes or inventory expires.
- **Medium:** External email, WhatsApp, social, and app-store links are outside the site’s direct control.
- **Medium:** Unspecified limits for travelers, segments, room occupancy, and form lengths make boundary coverage incomplete.
- **Medium:** Refund and cancellation outcomes depend on supplier-specific rules and may require controlled fixtures.
- **Medium:** Differences between customer and agent permissions may create cross-role access defects.
- **Low:** Responsive layout, date pickers, dropdowns, and loading states may behave differently across browsers and viewport sizes.

## Automation Candidates

### High Priority

- Smoke checks for homepage, Stays, Flights, Visa, Login, Signup, Forgot Password, and key policy pages.
- Hotel search with valid data, validation errors, modify-search behavior, result details, and room selection.
- Flight search for one-way and round-trip modes, required-field validation, result filtering, and selection.
- Visa search form validation and successful search transition.
- Customer signup validation, login failure, login success with controlled credentials, and password-reset response.
- Checkout field validation, terms acceptance, sandbox payment success/failure, duplicate-submit protection, and confirmation rendering.

### Medium Priority

- Currency and language controls.
- Responsive layout at representative desktop, tablet, and mobile viewports.
- Keyboard navigation, focus order, labels, and accessible names for all booking forms.
- Empty-result, API-error, timeout, retry, and stale-price states using mocked service responses.
- Policy links, contact links, footer navigation, and external-link targets.
- Agent signup entry point and role-based access checks using controlled accounts.

### Lower Priority or Requires Test Doubles

- Real supplier availability, price changes, booking persistence, and confirmation email delivery.
- Refund processing, supplier cancellation rules, and payment-provider settlement behavior.
- Maximum multi-city segments, large result sets, and high-volume concurrent searches.
- Security rate-limit, session, authorization, and injection tests in an approved non-production environment.

## Recommended Test Data and Environment

- Use fixed seeded hotel, flight, visa, customer, agent, and payment fixtures.
- Freeze the application date for date-sensitive tests.
- Use sandbox payment tokens only; never use real card data.
- Mock supplier responses for deterministic empty, error, stale-price, and changed-availability cases.
- Maintain separate customer and agent accounts with known permissions.
- Capture booking references and clean up test bookings where the demo environment permits it.
- Run cross-browser and mobile checks against a stable deployed build.

## Traceability Notes

The requirements above are derived from the publicly visible PHPTRAVELS homepage, booking forms, login, signup, forgot-password, agent-signup, how-to-book, contact, and refund-policy pages. Items marked as missing or ambiguous require confirmation from product, supplier, payment, and compliance owners before they can be treated as definitive acceptance criteria.