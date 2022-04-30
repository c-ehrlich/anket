# Anket Todo (current)
## MVP v1
### Want to do next
- [ ] Make MultipleChoiceOption reorder draggable, remove buttons https://www.framer.com/docs/reorder/
- [ ] Try switching to Mantine-Form and use Zod validation on it
### Bugs
- [!] Choppy MCO reordering - is it because it's doing it on optimistic updates, thus rerendering the entire dom?
### DB
- [ ] Get the real DB running https://vercel.com/guides/nextjs-prisma-postgres
### UI
- [ ] small screen: sidebar in/out should be animated
- [ ] make all the disabled stuff in the anket creator not have special mouse cursors
- [ ] Choose nicer fonts
- [ ] Make side margins about 1/2 of what they currently are on XS screens
- [ ] Transition to styles api (there should be no `style={{}}` in the app)
- [ ] Modal styling... they look a bit sad
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
### Maybe / Todos
- [x] Make type names shorter
- [ ] DRY: make getting the ID in controllers a middleware? Then we can just assume that it's on the request
- [ ] Creating a survey also creates the first question, creating a question also creates the first answer option
- [ ] Type React Query errors (is it just the type of { message: string? }) probably not...look at one and figure it out
- [ ] See where we can reduce the number of props (for example in EditSurveyMultipleChoiceAnswer by passing an object instead of multiple parts of that object)
- [ ] User profiles ... users can have settings, nicknames, etc
  - [ ] When logging in with a user that doesn't exist in the db yet, force them to create a user profile

# Anket Done
## MVP v1
### Bugs
- [x] Figure out why login is broken
  - [x] Was just something about some package
- [x] /surveys/mine: API request fails 
- [x] Optimistic update on reorder questions produces incorrect data
- [x] answer option delete briefly causes the app to render the wrong state
- [x] Theme is not saved on page reload (put it in localstorage?)
- [x] Fix answer option reorder not working
- [x] AddQuestion mutation briefly adds TWO questions (until we get back the server response?)
- [x] useDebouncedCallback doesn't save data if we type, hit tab, type again very fast => because the previous requests get cancelled
  - [*] solution: use separate debounces for each field
- [x] Adding and removing answer options: sometimes stuff collapses into each other
- [x] Answer Option Creation causes the container to bounce around - not making the question itself a motion.div fixes it - ask in framer motion discord
- [x] Question container height: make transitions take time so container doesn't shrink faster than the contents
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
- [x] Revise Create Question card design
  - [*] Color scheme: https://smart-swatch.netlify.app/#green
- [x] Framer Motion reordering: AnswerOptions
- [x] Framer motion animations: Questions
- [x] Make Delete Question and Delete MCO buttons red
- [x] Make Delete Question and Delete MCO modals
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
- [x] Connect 'Create Survey' and 'Preview Survey' pages
- [x] Change Inputs to TextInputs
- [x] Create neat Public/Private badge
- [x] Create neat In Created / Incomplete badge
- [x] Create custom hooks for React Query queries and mutations
- [x] Only use one useQuery to manage the entire survey creation
- [x] Only load EditSurvey after we have query data
- [x] Put EditSurvey text field data in local state
- [x] Debounce text inputs in EditSurvey
- [x] Put in state and debounce text inputs in EditSurveyQuestion
- [x] Put in state and debounce text inputs in EditSurveyMultipleChoiceAnswer
### Take Survey
### Backend
- [x] clone the logger from tom does tech youtube clone, and re-convert every consoleDOTlog/error to that logger
- [x] Create schema for everything and validate every request
  - [x] Also use these types in the frontend, so we have no more Partial<>, Pick<>, etc
  - [x] There's also some Partial<>s in the backend...fix those also
  - [x] Move surveywithauthor from .d.ts to a zod schema
  - [x] Check the types on every res in controllers... still using some Prisma generated types