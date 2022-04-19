# Anket Todo (current)
## MVP v1
### Bugs
- [ ] /surveys/mine: API request fails 
### UI
- [ ] Logout: keep div height constant
- [ ] small screen: sidebar should close if we navigate to a new page
### Create/Edit Survey
- [ ] Get it working basically
- [ ] Create routes for all the main survey creation and modification CRUD
- [ ] Keep the survey hidden ('complete' column in schema/survey?) until the user marks it as done?
- [ ] Allow surveys to be secret (only available to people with the link, always hide in 'all') ... db column
- [ ] Give surveys optional header images
  - [ ] Figure out how image upload works
  - [ ] Where can we store them? What about in deployment? S3?
### Taking a survey
- [ ] create an interaction, then redirect
- [ ] figure out how to deal with the fact that we need to CREATE a bunch of stuff while the survey is being filled out
### Survey Responses
- [ ] Get count of responses
- [ ] For multiple choice, see what percentage of people chose each
- [ ] For text, maybe IF it has 3 or more responses, find the 3 most popular words, and list those along with sample responses that use them
  - [ ] Exclude common words?
  - [ ] Or just open a modal that contains all the responses?

# Anket Done
## MVP v1
### Bugs
- [x] Figure out why login is broken
  - [x] Was just something about some package
## Chore
- [x] Update to React 18
- [x] Update to React Query 4
### UI
- [x] Implement dark theme
- [x] Make dark theme work everywhere
- [x] Create initial logo
- [x] Create nice logged in user indicator / logout indicator
### Create/Edit Survey
- [x] Use React Query to manage survey in frontend
  - [x] Make /survey/create just a dummy page that creates a survey and redirects to /survey/edit/id, that way create and edit are basically the same!
- [x] Add an edit button to each survey in My Surveys
### Take Survey
### Misc Backend Stuff
- [x] clone the logger from tom does tech youtube clone, and re-convert every console.log/console.error to that logger
