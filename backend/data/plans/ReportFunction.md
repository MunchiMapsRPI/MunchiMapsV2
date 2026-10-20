# Munchi Maps Report Function

## Purpose

Allow users to report current problems with vending machines so the map can show
temporary warnings and the Munchi Maps team can correct machine information.

## What Can Be Reported

Users can report:

- Machine is out of order.
- Machine is empty or out of stock.
- Other relevant issue.

Reports should describe something the user observed. The `Other` option should
include a short description.

## How Users Start a Report

Each vending-machine marker popup should include a **Report an issue** button.
The selected machine should already be attached to the report so the user does
not have to select it again.

A QR code may also be placed near each machine. The QR code should open the
report form. 

## Report Popup

The report should open in a popup or modal over the map. It should show:

- The building and vending-machine picture.
- A required issue selection.
- An optional description field.
- A submit button.
- A cancel or close button.

The description should be required for the `Other` option. After submission,
the user should see a confirmation that the report was received. If submission
fails, the user should be told that the report was not submitted and be allowed
to try again.

## Effect on the Website

Reports should be temporary rather than permanent machine data.

- A single report can be recorded without immediately changing the marker.
- Multiple recent reports for the same issue can display a warning on the
  machine marker and in its popup.
- The warning should use wording such as `Reported issue` rather than claiming
  the machine is definitely broken.

The exact number of reports needed to display a warning can be adjusted as the
feature is tested. The threshold should be consistent across the website.

## Report Expiration

Reports should expire after a period of time so old problems do not remain on
the map. A starting rule is:

- General machine problems expire after 24 hours.

When all relevant reports expire or are resolved, the machine warning should be
removed.

## Duplicate and Invalid Reports

The system should avoid repeated reports for the same machine and issue from the
same user within a short period. It should also reject reports for machines
that no longer exist and prevent users from submitting an empty issue type.

## Review and Resolution

Reports should be available for review by the Munchi Maps team. A report can be
marked as resolved or dismissed. Resolving a report removes it from the active
warning calculation.

## Initial QR Code Decision

The preferred approach is one QR code per vending machine. Each QR code opens
the report form with the correct machine preselected, reducing user selection
errors.
