# Anket Todo (current)
## MVP v1
### Bugs
### DB
- [ ] implement order on answeroptions
- [ ] implement reordering on answeroptions
### UI
- [ ] small screen: sidebar in/out should be animated
- [ ] Change question styling... the drop shadow is barely visible on top/left. maybe a border?
- [ ] question name and description have no placeholder
- [ ] Get question framer motion working
### Create/Edit Survey
- [ ] Get it working basically
- [ ] Create routes for all the main survey creation and modification CRUD
  - [ ] Changing a question type ... should it delete the multiple choice options or not?
- [ ] Keep the survey hidden ('complete' column in schema/survey?) until the user marks it as done?
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
### Queries
- [ ] Do optimistic updates on one text input axios request
- [ ] Do optimistic updates on all text input axios requests
- [ ] Debounce one text input axios request
- [ ] Debounce all text input axios requests
### Maybe
- [ ] Creating a survey also creates the first question, creating a question also creates the first answer option
- [ ] Type React Query errors (is it just the type of { message: string? }) probably not...look at one and figure it out

# Anket Done
## MVP v1
### Bugs
- [x] Figure out why login is broken
  - [x] Was just something about some package
- [x] /surveys/mine: API request fails 
## DB
- [x] Implement order on questions
- [x] send questions and answeroptions ordered on DB level
## Chore
- [x] Update to React 18
- [x] Update to React Query 4
### UI
- [x] Implement dark theme
- [x] Make dark theme work everywhere
- [x] Create initial logo
- [x] Create nice logged in user indicator / logout indicator
- [x] small screen: sidebar should close if we navigate to a new page
### Create/Edit Survey
- [x] Use React Query to manage survey in frontend
  - [x] Make /survey/create just a dummy page that creates a survey and redirects to /survey/edit/id, that way create and edit are basically the same!
- [x] Add an edit button to each survey in My Surveys
- [x] Let user delete in progress survey
- [x] Allow surveys to be secret (only available to people with the link, always hide in 'all') ... db column
- [x] Create Question
- [x] Delete Question
- [x] implement arbitrary reordering on questions

### Take Survey
### Misc Backend Stuff
- [x] clone the logger from tom does tech youtube clone, and re-convert every consoleDOTlog/error to that logger
