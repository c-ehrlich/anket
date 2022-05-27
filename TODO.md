# Anket Todo (current)

## Next thing to do
- [ ] Add Google login again
- [ ] Use APIErrorResponse in all Controllers

## MVP 2
### Deployment
- [ ] Get it working on VPS with Docker + GitHub Actions
  - [ ] See vps branch
  - [ ] Research HTTPS on Hetzner...do I need to buy a domain?
### Known Bugs
### UI
- [ ] Spinner for /survey/all
- [ ] Spinner for /survey/mine
- [ ] Figure out how not to invalidate front page and list data as soon as we leave a page (give it 5 minutes or something)
- [ ] Landing page: reduce spacing between sections on phones
- [ ] AppShell: on phone screens, scrolling the menu should scroll the menu, not the content underneath it!
- [ ] Transition to styles api (there should be no `style={{}}` in the app)
- [ ] Modal styling... they look a bit sad
- [ ] Read all of Refactoring UI and make UI changes based on it
- [ ] Make login page a modal instead (https://github.com/nextauthjs/next-auth/issues/178)
- [ ] small screen: sidebar in/out should be animated
- [ ] make all the disabled stuff in the anket creator not have special mouse cursors
- [ ] Improve the Logo (choose a font that works well with the existing ones, don't make the spacing so weird)
- [ ] Improve body text typography
- [ ] Good message on empty /survey/mine
  - [ ] Prompt user to create one
- Consider bringing in a second heading font that's sans serif?
### Survey Creation
- [ ] Submitting / error checking... what do we want to make sure of before submitting a survey?
  - [ ] No empty questions (last question can be empty, just trim it)
  - [ ] No empty answer options (last answer option can be empty, just trim it)
  - [ ] After trimming empty stuff at the end, nothing should have a title that is equal to the empty string
  - [ ] See how the mantine forms stuff works...
- [ ] Header images... use real uploading instead
  - [ ] Figure out how image upload works
  - [ ] Where can we store them? What about in deployment? S3?
  - [ ] Default image for surveys that don't have one assigned ... refresh until I find a good one and copy that
### Taking a survey
- [ ] Use schema validation on the submission
### Surveys
- [ ] Browser: More search options
  - [ ] My Surveys: Incomplete vs Complete
  - [ ] All Surveys: Not taken vs Started vs Complete
- [ ] Multiple Choice Options should have 'other' option
  - [ ] This should be optional (decided by survey author whether to include it?)
  - [ ] Create DB Model
  - [ ] Create Backend implementation
  - [ ] Create Implementation during survey creation
  - [ ] Create Implementation during survey taking
### Stats
- [ ] Rebuild in d3.js + airbnb visx https://airbnb.io/visx/gallery
  - [ ] https://codesandbox.io/s/github/airbnb/visx/tree/master/packages/visx-demo/src/sandboxes/visx-shape-pie?file=/Example.tsx
- [ ] For multiple choice, see what percentage of people chose each
- [ ] Each bar is a different color
- [ ] Bars have truncated bottom labels and full labels on hover
- [ ] Nice % labels
- [ ] Axes are % or absolute?
### Users
- [ ] User profiles ... users can have settings, nicknames, etc
  - [ ] When logging in with a user that doesn't exist in the db yet, force them to create a user profile
### Maybe / Todos
- [ ] See where we can reduce the number of props (for example in EditSurveyMultipleChoiceAnswer by passing an object instead of multiple parts of that object)
- [ ] Go through all major parts of the app in browser with console open and fix any errors
- [ ] Go through all major parts of the app with network requests open and fix any that are red
- [ ] See if there are any schema/types that are used nowhere
### Refactor
- [ ] All handlers should return strings on error, not json
  - [*] OR { error: string } ???

# Anket Done
## MVP 2
### Bugs
- [x] Resume button on dashboard links to bugs
- [x] 400 on requesting all surveys when there are none
- [x] buggy MCO reordering
### Survey Creation / Editing
- [x] FIRST VALIDATION TEST: /create should be a form with title and optional description, clicking it creates a survey and takes us to the page to edit that survey
- [x] Description should support line breaks
- [x] Remove debug text in /create
### Stats
- [x] Hide stats if there are 0 responses
### Chore
- [x] Use APIErrorResponse in all controllers
### UI
- [x] Dashboard... Spinners for left AND right sections! right section currently doesn't have a spinner

## MVP 1
### Deployment
- [x] Get it working on Vercel
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
- [x] Incorrect filtering of userId in 'all surveys' handler/service
- [x] Choppy MCO reordering - https://github.com/framer/motion/issues/1518
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
- [x] Improve sidebar size and styling
- [x] Use a good serif font for titles
- [x] Create Mantine theme
- [x] Dashboard: make strings better... single/plural etc
- [x] Improve the dashboard layout a bit...
  - [x] Header texts should be bigger ('You have 1 unfinished survey' etc)
- [x] Small screen side margins
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
- [x] Add 'Survey Info' to EditSurvey
- [x] Give surveys optional header images
  - [x] Just a URL field for now...
  - [x] Use this header image in SurveyHero, with a fallback to some random image
  - [x] Implement in EditSurvey
  - [x] Implement in PreviewSurvey
  - [x] Implement in SurveyStats
  - [x] Implement in TakeSurvey
  - [x] Implement in ThanksForCreatingSurvey
  - [x] Implement in ThanksForTakingSurvey
- [x] Preserve AnswerOptions when changing questionType
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
- [x] Create some data to be able to test the stats page
- [x] Create basic (ugly) graphs that show the stats
- [x] Get count of responses
