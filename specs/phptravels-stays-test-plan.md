# PHPTRAVELS Stays UI Test Plan

## Application Overview

UI-only test plan for the PHPTRAVELS Stays tab. Covers the hotel search form, visible validation, destination/date/guest/nationality controls, results, property details, room selection, and user-facing booking continuation. Explicitly excludes Flights, Visa, account and agent flows, support pages, all API testing, supplier-contract testing, payment-gateway API testing, and performance testing. Use only demo data and sandbox payment paths; never use real payment information.

## Test Scenarios

### 1. Stays Search Form

**Seed:** `tests/seed.spec.ts`

#### 1.1. Search hotels with valid criteria

**File:** `tests/stays/search-valid-hotel.spec.ts`

**Steps:**
  1. Open https://phptravels.net/stays in a fresh browser context.
    - expect: The Stays page and hotel search form are visible.
  2. Dismiss the demo notice if it appears by clicking "I Understand & Continue".
    - expect: The notice closes and the Stays form remains usable.
  3. Select a supported city or hotel, valid future check-in and check-out dates, one room, two adults, zero children, and a supported nationality.
    - expect: Each selected value is shown in the corresponding Stays control.
  4. Click "Search Hotels".
    - expect: The UI starts the hotel-results flow and retains the submitted search criteria.

#### 1.2. Validate required destination and nationality

**File:** `tests/stays/search-required-fields.spec.ts`

**Steps:**
  1. Open the Stays page in a fresh browser context and dismiss the demo notice if needed.
    - expect: The Stays form is visible.
  2. Set valid dates and occupancy but leave the destination empty, then click "Search Hotels".
    - expect: The UI blocks submission and identifies the missing destination.
    - expect: No valid results state is opened.
  3. Enter a valid destination but leave Nationality as "Select Nationality", then submit again.
    - expect: The UI blocks submission or clearly indicates nationality is required.
  4. Select a valid nationality and submit with all other valid criteria.
    - expect: The search can proceed.

#### 1.3. Validate hotel date rules

**File:** `tests/stays/search-invalid-dates.spec.ts`

**Steps:**
  1. Open the Stays page and select a valid destination.
    - expect: The destination is shown as selected.
  2. Attempt to use a check-out date before check-in or an otherwise invalid date range.
    - expect: The date picker prevents the invalid selection or shows a clear validation message.
  3. Submit the form with the invalid range if the UI permits it.
    - expect: The search is not submitted with an invalid date range.
    - expect: Valid unrelated values remain available for correction.

#### 1.4. Adjust rooms, adults, and children

**File:** `tests/stays/search-guest-room-controls.spec.ts`

**Steps:**
  1. Open the "Guests & Rooms" selector.
    - expect: Room controls and a traveler section with Adults and Children are visible.
  2. Increase and decrease room, adult, and child counts.
    - expect: Each visible count changes correctly and the summary updates after closing the selector.
  3. Attempt to decrement the minimum room or adult count below the supported minimum.
    - expect: The remove control is disabled or the count does not go below the minimum.

#### 1.5. Search destination by city or hotel name

**File:** `tests/stays/destination-selector.spec.ts`

**Steps:**
  1. Open the Destination or Hotel Name selector.
    - expect: A "Search By City" input is visible.
  2. Type a partial supported city or hotel name.
    - expect: Matching suggestions or matching search results are displayed.
  3. Select a suggestion and reopen the selector with a value that has no matches.
    - expect: The selected value is retained after selection.
    - expect: The no-match state is clear and does not corrupt the existing form.

### 2. Stays Results and Room Selection

**Seed:** `tests/seed.spec.ts`

#### 2.1. Display results for a valid hotel search

**File:** `tests/stays/results-display.spec.ts`

**Steps:**
  1. Submit a valid Stays search using a supported destination, future dates, two adults, one room, and nationality.
    - expect: A hotel-results page or results state is displayed.
    - expect: The result summary retains destination, dates, guests, rooms, and nationality where shown.
  2. Inspect the visible hotel cards.
    - expect: Available cards show property names and a price or availability state.
    - expect: Location, rating, discount, imagery, or other available property information is displayed consistently.
  3. Wait for the results state to finish loading.
    - expect: The UI resolves to results, a clear empty state, or a clear user-facing error state.

#### 2.2. Modify the hotel search from results

**File:** `tests/stays/results-modify-search.spec.ts`

**Steps:**
  1. Open results from a valid hotel search.
    - expect: A Modify Search or equivalent control is visible.
  2. Change the dates or occupancy and apply the modified search.
    - expect: The updated values appear in the search summary or form.
  3. Review the refreshed result state.
    - expect: The results reflect the updated criteria or show a clear no-results state.

#### 2.3. Open property details and select a room

**File:** `tests/stays/hotel-room-selection.spec.ts`

**Steps:**
  1. Select a hotel result with visible availability.
    - expect: The property details view opens or expands.
  2. Review the property, dates, occupancy, room/rate, price, and cancellation information.
    - expect: The selected booking context and visible rate conditions are understandable.
  3. Select an available room or rate.
    - expect: The selection is visibly marked or carried into the next booking step.
    - expect: Unavailable or expired rates cannot be selected.

### 3. Stays Booking UI

**Seed:** `tests/seed.spec.ts`

#### 3.1. Validate required booking details

**File:** `tests/stays/checkout-required-fields.spec.ts`

**Steps:**
  1. Reach the hotel booking-details or checkout step using an available room in the demo environment.
    - expect: A booking summary and required customer or traveler fields are visible.
  2. Leave required fields empty and click the continue or booking action.
    - expect: Field-level validation identifies missing values.
    - expect: The user remains in the flow and valid entered values are preserved.
  3. Enter malformed contact or traveler data.
    - expect: The UI rejects invalid values with clear feedback.

#### 3.2. Review hotel booking before payment

**File:** `tests/stays/checkout-review.spec.ts`

**Steps:**
  1. Complete required visible booking fields with non-sensitive test data.
    - expect: The user can continue to the review or payment step.
  2. Inspect the booking summary.
    - expect: The summary shows property, room/rate, dates, occupancy, price, fees where available, and cancellation conditions where available.
  3. Return to an earlier step and change a booking value.
    - expect: The summary updates consistently and no duplicate booking is created by navigation alone.

#### 3.3. Require terms acceptance before final booking

**File:** `tests/stays/checkout-terms.spec.ts`

**Steps:**
  1. Reach the final booking or sandbox payment step without accepting the displayed terms.
    - expect: The terms control is visibly unselected.
  2. Click the final action.
    - expect: The UI blocks continuation and explains that terms must be accepted.
  3. Accept the terms and continue using only an approved sandbox path.
    - expect: The next step is allowed and no real payment data is requested.

#### 3.4. Show booking confirmation after successful demo booking

**File:** `tests/stays/booking-confirmation.spec.ts`

**Steps:**
  1. Complete a valid hotel booking with demo data and an approved sandbox payment path.
    - expect: A successful booking state is displayed.
  2. Inspect the confirmation.
    - expect: A booking reference and selected hotel details are shown where supported.
    - expect: The confirmation matches the submitted property, dates, occupancy, and customer details.
  3. Refresh the confirmation page once.
    - expect: No duplicate booking is created and the confirmation remains understandable or provides a safe recovery state.

#### 3.5. Handle failed or cancelled sandbox payment

**File:** `tests/stays/payment-failure.spec.ts`

**Steps:**
  1. Reach the Stays payment step and use the approved sandbox failure or cancellation path.
    - expect: A clear payment failure, cancellation, or retry state is shown.
  2. Retry once or abandon the booking using the visible UI.
    - expect: The user can recover or exit safely.
    - expect: No duplicate confirmation is shown for the failed attempt.

#### 3.6. Verify Stays mobile and keyboard usability

**File:** `tests/stays/responsive-accessibility.spec.ts`

**Steps:**
  1. Open the Stays page at a representative mobile viewport.
    - expect: Controls fit without overlap or horizontal clipping.
  2. Open destination, dates, guests and rooms, and nationality controls at the mobile viewport.
    - expect: Each control can be opened, used, and dismissed.
  3. Navigate through the Stays controls with the keyboard.
    - expect: Focus order is logical, focus is visible, and the form can be submitted or validated without pointer input.
