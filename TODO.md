# Anket Todo (current)
## MVP v1
### Want to do next
- [ ] Try switching to Mantine-Form and use Zod validation on it
### Bugs
- [!] Choppy MCO reordering - https://github.com/framer/motion/issues/1518

### Deployment
- [ ] Figure out how to deploy it
- [ ] To a VPS? Hetzner?
- [ ] Get the real DB running https://vercel.com/guides/nextjs-prisma-postgres
  - [ ] Can test this even before deploying
- [ ] Figure out how to set up GitHub Actions
### UI
- [ ] Dashboard: make strings better... single/plural etc
- [ ] small screen: sidebar in/out should be animated
- [ ] Sidebar feels like it's the wrong size in general
  - [ ] I made it that big so the name is readable... BUT 1. different length names will be readable or not readable anyway 2. is that REALLY important anyway?
  - [ ] Maybe put some different text there, see how twitter etc do it,...
- [ ] make all the disabled stuff in the anket creator not have special mouse cursors
- [ ] Choose nicer fonts (use the themeing in Mantine - and use same fonts as landing page?)
- [ ] Make side margins about 1/2 of what they currently are on XS screens
- [ ] Transition to styles api (there should be no `style={{}}` in the app)
- [ ] Modal styling... they look a bit sad
- [ ] Landing page: reduce spacing between sections on phones
- [ ] Make login page a modal instead (https://github.com/nextauthjs/next-auth/issues/178)
- [ ] AppShell: on phone screens, scrolling the menu should scroll the menu, not the content underneath it!
### Taking a survey
- [ ] Use schema validation on the submission
### Survey Responses
- [ ] Make a button that creates three dummy responses
  - [ ] Seed the database with three fake users (check how fcc seeds the database)
  - [ ] dummy responses have an additional isDummyResponse field so we can easily delete them in the future?
- [ ] Get count of responses
- [ ] For multiple choice, see what percentage of people chose each
- [ ] For text, maybe IF it has 3 or more responses, find the 3 most popular words, and list those along with sample responses that use them
  - [ ] Exclude common words?
  - [ ] Or just open a modal that contains all the responses?
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
- [ ] Description should support line breaks
### Survey Stats
- [ ] Create some data to be able to test the stats page
- [ ] Research which charts package to use
  - [ ] d3.js + react thing?
  - [ ] Something else?
### Maybe / Todos
- [ ] Type React Query errors (is it just the type of { message: string? }) probably not...look at one and figure it out
- [ ] See where we can reduce the number of props (for example in EditSurveyMultipleChoiceAnswer by passing an object instead of multiple parts of that object)
- [ ] User profiles ... users can have settings, nicknames, etc
  - [ ] When logging in with a user that doesn't exist in the db yet, force them to create a user profile
- [ ] Go through all major parts of the app in browser with console open and fix any errors
- [ ] Go through all major parts of the app with network requests open and fix any that are red

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
- [x] Create Survey creates 2 surveys (strict mode issue)
- [x] Create Survey also creates a survey if we just created an empty one a second ago
  - [x] because we're checking for it not having any questions, which it does now
  - [*] solution: use separate debounces for each field
- [x] Adding and removing answer options: sometimes stuff collapses into each other
- [x] Answer Option Creation causes the container to bounce around - not making the question itself a motion.div fixes it - ask in framer motion discord
- [x] Question container height: make transitions take time so container doesn't shrink faster than the contents
- [x] Adding an MCO is skippy again... make sure everything else on the same level is motion, key, layout
- [x] 'My Surveys' fails to load on dashboard refresh because we don't have the session yet
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
- [x] Make delete modals
- [x] Build backend stuff for reordering of all MCOs
- [x] Reorder MCOs by dragging
- [x] Creating a survey also creates the first question, creating a question also creates the first answer option
- [x] Implement submitting survey (without validation for now)
### User Profile Page
- [x] Create it
### Take Survey
- [x] Create SurveyInteraction
- [x] Allow responding to MCM Questions
- [x] Allow responding to MCS Questions
- [x] Allow responding to text questions
- [x] Allow responding to Yes/No questions
- [x] Allow responding to 0-10 questions
- [x] Refactor the mess I've made (separate components)
- [x] Create optimistic update in useUpsertQuestionResponse
- [x] Allow deleting response
  - [x] Numeric
  - [x] Boolean
  - [x] MultipleChoiceSingle
- [x] optimistic updates in useDeleteQuestionResponse
- [x] Text Response input should be resizeable
- [x] Allow Submitting the entire interaction to make it 'done'
  - [x] Create thank you page
  - [x] Redirect to a thank you page after submission
### Backend
- [x] clone the logger from tom does tech youtube clone, and re-convert every consoleDOTlog/error to that logger
- [x] Create schema for everything and validate every request
  - [x] Also use these types in the frontend, so we have no more Partial<>, Pick<>, etc
  - [x] There's also some Partial<>s in the backend...fix those also
  - [x] Move surveywithauthor from .d.ts to a zod schema
  - [x] Check the types on every res in controllers... still using some Prisma generated types
### Refactor
- [x] DRY: make getting the ID in controllers a middleware? Then we can just assume that it's on the request
  - [x] ...or at least a function
- [x] Delete all references to Product
- [x] Make type names shorter
- [x] Modify all services to return promises instead of the actual objects
### Landing Page
- [x] Write copy
- [x] Create good styling
- [x] find images
- [x] Create good layout for desktop
- [x] Create scroll down button
- [x] Create transforms on hover
- [x] Create good layout for iPad
- [x] Create good layout for iPhone 13
- [x] Create good layout for iPhone 6
### Custom /signin
- [x] Hide sidebar
- [x] Nice buttons with logos
- [x] Look good on phone
- [x] Look good on iPad
- [x] Look good on computer
- [x] Redirect to home if we're already logged in
- [x] Either make theme switcher work on login page or hide it
- [x] Hide the sidebar opener thing on small screens
### Survey Browser
- [x] Add filtering
- [x] Make it generic so that 'all surveys' can use the same thing
- [x] If there are 0 results, display different things depending on if it's from the filter removing everything or there not being any in first place
### Survey Hero
- [x] Improve styling
- [x] On other user's surveys, distinguished between:
  - [x] Not started: no interaction, or the interaction has nothing in it
    - [x] Button regular (border?), some kind of icon
  - [x] Started: interaction, but not finished
    - [x] Button loud (filled?), icon: Square
  - [x] Finished: interaction marked finished
    - [x] Button disabled?, icon: Checkbox
- [x] Controller / Service
  - [x] We need the interaction
  - [x] We need to know what's inside the interaction (maybe just the COUNT of QuestionResponses and MCOSelections?)
    - [x] Can we 'reduce' / 'aggregate'?
  - [x] Might need to change the types for this to work
  ### Dashboard
- [x] Get data into frontend
- [x] Display it
  - [x] My Surveys
    - [x] if none: You have not created any surveys yet. Why not (link: create one now)?
    - [x] Finish creating this survey / these surveys!
    - [x] There were ${num} new or modified respones to your surveys in the past 24 hours - view data
  - [x] Participations
    - [x] You have {num} uncompleted survey responses!
      - (list)
      - (else: You are currently not taking any surveys. Why not (link: find one to take)?
### Survey Stats
- [x] Create backend functionality to get survey stats
- [x] Get survey stats into frontend as JSON

## MVP 2
### Surveys
- [ ] Multiple Choice Options should have 'other' option
  - [ ] This should be optional (decided by survey author whether to include it?)
  - [ ] Create DB Model
  - [ ] Create Backend implementation
  - [ ] Create Implementation during survey creation
  - [ ] Create Implementation during survey taking
