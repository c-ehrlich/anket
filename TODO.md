# Anket Todo (current)
## MVP v1
### Bugs
- [ ] Login framer motion stuff is broken for some reason

### DB
### UI
- [ ] small screen: sidebar in/out should be animated
- [ ] Get question framer motion working
- [ ] make all the disabled stuff in the anket creator not have special mouse cursors
- [ ] Choose nicer fonts
- [ ] Get a theme going... green as the main accent color?
- [ ] Question Type: should be 'real' words
### Create/Edit Survey
- [ ] Submitting / error checking... what do we want to make sure of before submitting a survey?
  - [ ] No empty questions (last question can be empty, just trim it)
  - [ ] No empty answer options (last answer option can be empty, just trim it)
  - [ ] After trimming empty stuff at the end, nothing should have a title that is equal to the empty string
  - [ ] See how the mantine forms stuff works...
- [ ] Keep the survey hidden ('complete' column in schema/survey?) until the user marks it as done?
- [ ] Give surveys optional header images
  - [ ] Figure out how image upload works
  - [ ] Where can we store them? What about in deployment? S3?
### Taking a survey
- [ ] create an interaction, then redirect
- [ ] figure out how to deal with the fact that we need to CREATE a bunch of stuff while the survey is being filled out (mutations...)
### Survey Responses
- [ ] Get count of responses
- [ ] For multiple choice, see what percentage of people chose each
- [ ] For text, maybe IF it has 3 or more responses, find the 3 most popular words, and list those along with sample responses that use them
  - [ ] Exclude common words?
  - [ ] Or just open a modal that contains all the responses?
### Queries
- [ ] I'll probably need to go back to state for every text box in order to be able to debounce, right? because otherwise we don't even get to the optimistic update...
- [ ] Debounce one text input axios request
- [ ] Debounce all text input axios requests
### Maybe
- [ ] Make type names shorter
- [ ] DRY: make getting the ID in controllers a middleware? Then we can just assume that it's on the request
- [ ] Creating a survey also creates the first question, creating a question also creates the first answer option
- [ ] Type React Query errors (is it just the type of { message: string? }) probably not...look at one and figure it out

# Anket Done
## MVP v1
### Bugs
- [x] Figure out why login is broken
  - [x] Was just something about some package
- [x] /surveys/mine: API request fails 
- [x] Optimistic update on reorder questions produces incorrect data
- [x] answer option delete briefly causes the app to render the wrong state
- [x] Theme is not saved on page reload (put it in localstorage?)
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
- [x] Sidebar icons and themeing
- [x] Add border to question cards
- [x] make green color scheme
### Create/Edit Survey
- [x] Use React Query to manage survey in frontend
  - [x] Make /survey/create just a dummy page that creates a survey and redirects to /survey/edit/id, that way create and edit are basically the same!
- [x] Add an edit button to each survey in My Surveys
- [x] Let user delete in progress survey
- [x] Allow surveys to be secret (only available to people with the link, always hide in 'all') ... db column
- [x] Create Question
- [x] Delete Question
- [x] implement arbitrary reordering on questions
- [x] Get answer options into the UI
- [x] Create answer options
- [x] Create answer option CRUD (backend)
- [x] Create answer option CRUD (frontend)
- [x] Delete answer option CRUD (backend)
- [x] Delete answer option CRUD (frontened)
- [x] Edit answer option text CRUD (backend)
- [x] Edit answer option text CRUD (frontend)
- [x] Move answer option CRUD (backend)
- [x] Move answer option CRUD (frontend)
- [x] Finish basic survey editing functionality
- [x] Use string names for question types
- [x] Create survey preview page (initial)
### Take Survey
### Misc Backend Stuff
- [x] clone the logger from tom does tech youtube clone, and re-convert every consoleDOTlog/error to that logger
