# Anket Todo
## BUGS
- [ ] Figure out why login is broken
  - [ ] see if we're hitting the DB at all when trying to login
  - [ ] And why does the first fake query still work?
- [ ] DB issue?
- [ ] Callback issue?
- [ ] API URL schema issue?

## Schema
- [ ] add image field to survey model (string, validate for url somehow?)

## plumbing
- [ ] Test creating a full survey with options etc
- [ ] Test editing a survey (can we )
- [ ] figure out how to let users upload static files - where to save then?
  - [ ] Survey header image

## new survey
- [ ] Should we also manage this with react-query even though it's not talking to the server yet? just await an empty survey?

## frontend
- [ ] Can the create and edit survey be the same page? Or at least basically use the same component but with the 'real' IDs instead of the arbitrary ones from the Create Survey page?
- [ ] Build a page to take a survey
  - [ ] Progress indicator
  - [ ] Auto scrolling
  - [ ] Save half finished survey in localstorage?
- [ ] split the survey creator into more components

## Backend
- [ ] Routes
  - [ ] Get one survey
  - [ ] Get all surveys (final app should probably not have this)
  - [ ] Get all own surveys (probably just title, description, image, or something like that - number of responses?)
    - [ ] how can these two be different urls? /surveys/mine?
  - [ ] Editing a survey ... maybe first learn a bit more about react query before attempting this