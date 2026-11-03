## 1. Document Scope

This document describes the problem space for a future report function in Munchi Maps. It records the context, users, reporting needs, constraints, risks, and unresolved questions.

It intentionally does not define the workflow, user interface, API, database schema, moderation process, notifications, statuses, or implementation plan. Those decisions belong in a later draft.

## 2. Application Context

Munchi Maps maps vending machines around the RPI campus. Students and visitors use the map to find vending machines and understand where they are located.

Vending-machine information can become inaccurate or incomplete over time. Machines may be removed, moved, inaccessible, empty, broken, or represented incorrectly on the map. Some changes may only be known by people who are physically near the machine.

The report function is intended to collect community observations about a specific vending machine or a vending machine that is missing from the map.

## 3. Users and Stakeholders

### 3.1 Reporters

Potential reporters include:

- RPI students.
- RPI faculty and staff.
- Visitors to the RPI campus.
- People who have recently used or attempted to use a vending machine.
- People who notice a vending machine that is not represented on the map.

Reporters may have different levels of familiarity with campus buildings, machine types, and Munchi Maps.

### 3.2 People Responsible for Munchi Maps Data

People responsible for maintaining Munchi Maps may need to:

- Examine community-submitted observations.
- Determine whether an observation is credible.
- Distinguish temporary conditions from permanent changes.
- Maintain accurate vending-machine locations and details.
- Resolve conflicting observations.

The exact ownership and responsibilities of these people are not yet defined.

### 3.3 People Affected by Reported Information

Reported information can affect:

- Students planning where to purchase food or drinks.
- Visitors navigating unfamiliar buildings.
- People deciding whether a vending machine is worth visiting.
- Anyone relying on Munchi Maps for accurate campus information.

## 4. Problems to Address

### 4.1 Inaccurate Map Information

- A vending machine may be mapped to the wrong building, floor, room, or coordinates.
- A vending machine may be shown in a location that is difficult to identify.
- A machine may exist on campus but be absent from Munchi Maps.
- Details about a machine may not match what is physically present.

### 4.2 Changes to Machine Availability

- A machine may be permanently removed.
- A machine may be temporarily out of order.
- A machine may be empty even though it is functioning.
- A machine may be available only during certain building-access hours.
- A machine may be inaccessible because a building or area is locked.
- A temporary problem may be mistaken for a permanent change.

### 4.3 Unclear or Incomplete Observations

- A reporter may know that something is wrong without knowing the machine's exact name or ID.
- A reporter may describe a building or location differently from the existing map data.
- A report may not include enough information to distinguish between nearby machines.
- The condition of a machine may change between the observation and the time it is reviewed.
- A report may describe a symptom without identifying its cause.

### 4.4 Conflicting Community Information

- Different people may report different conditions for the same machine.
- Several people may report the same issue independently.
- A machine may be reported as empty by one person and stocked later by another.
- Users may disagree about whether a machine has been removed or temporarily relocated.
- A report may conflict with existing Munchi Maps data.

### 4.5 Trust and Abuse

- People may submit inaccurate reports by mistake.
- People may submit reports without visiting the machine.
- Repeated reports may create noise without adding new information.
- A user may submit spam, offensive text, or irrelevant content.
- A malicious or mistaken report could make a working machine appear unavailable.
- Uploaded evidence may contain personal information or images of other people.

### 4.6 Stale Information

- Temporary conditions can become outdated quickly.
- A report may remain relevant for a short period but not indefinitely.
- A machine's availability can change independently of its location and permanent details.
- Historical reports may no longer describe the current condition of a machine.

## 5. Report Subject and Possible Information

A report may concern:

- A vending machine already present on the map.
- A vending machine that is missing from the map.
- The machine's physical presence or absence.
- The machine's location.
- The machine's accessibility.
- The machine's operational condition.
- The machine's stock level at the time of observation.
- Information displayed about the machine.

Potential information associated with an observation includes:

- The vending machine or approximate location.
- Building and floor.
- Report category.
- Free-text description.
- Date and approximate time observed.
- Corrected location or detail information.
- Photo or other supporting evidence.
- The identity of the reporter, if identity is collected.

This list describes information that may be relevant to the problem. It does not prescribe which fields the final report function must collect.
