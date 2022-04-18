# Anket Todo
## BUGS
- [ ] /surveys/mine: we don't have the user token right away, so a hard refresh sends an empty token to the api

## Chore
- [ ] Update to React 18
- [ ] Update to React Query 4

## Schema
- [ ] add image field to survey model (string, validate for url somehow?)

## plumbing
- [ ] Test creating a full survey with options etc
- [ ] Test editing a survey (can we )
- [ ] figure out how to let users upload static files - where to save then?
  - [ ] Survey header image

## new survey
- [ ] implement react-query (give it a random cuid and wait...)

## frontend
- [ ] Logout: keep div height constant

- [ ] add ID to question answers in frontend (use uuidv4 or something)

- [ ] we've gone too far on state... figure out how tf react-query works

- [ ] Can the create and edit survey be the same page? Or at least basically use the same component but with the 'real' IDs instead of the arbitrary ones from the Create Survey page?
- [ ] Build a page to take a survey
  - [ ] Progress indicator
  - [ ] Auto scrolling
  - [ ] Save half finished survey in localstorage?
- [ ] split the survey creator into more components
- [ ] small screen: sidebar should close if we navigate to a new page

## Backend
- [ ] Routes should pass 'message' OR just the objects they fetch without a message, so it's easier to type
- [ ] Routes
  - [ ] Get one survey
  - [ ] Get all surveys (final app should probably not have this)
  - [ ] Get all own surveys (probably just title, description, image, or something like that - number of responses?)
    - [ ] how can these two be different urls? /surveys/mine?
  - [ ] Editing a survey ... maybe first learn a bit more about react query before attempting this

# Done
## MVP v1
### Bugs
- [x] Figure out why login is broken
  - [x] Was just something about some package
### UI
- [x] Implement dark theme
- [x] Make dark theme work everywhere
- [x] Create initial logo
- [x] Create nice logged in user indicator / logout indicator