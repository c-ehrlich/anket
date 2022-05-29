import SurveyStats from '../../../components/SurveyStats';
import { SurveyStatsResponse } from '../../../backend/surveyStats/surveyStats.schema';

const SurveyStatsPage = () => {
  return <SurveyStats survey={survey} />;
};

export default SurveyStatsPage;

/*
 *
 * BELOW HERE IS THE FAKE DATA FOR THE SURVEY DEMO PAGE
 *
 */

const survey: SurveyStatsResponse = {
  id: 'aaa123',
  name: 'Anket User Survey',
  description:
    'Thank you for being among the first people to try Anket. Please let us know your experiences so far and how we can improve it :)',
  picture: 'https://i.imgur.com/Z1npezu.jpg',
  updatedAt: new Date(),
  isPublic: true,
  isCompleted: true,
  author: {
    id: 'aaa123',
    name: 'Anket Team',
    image: 'https://i.imgur.com/Z1npezu.jpg',
  },
  participations: [
    { id: 'a' },
    { id: 'a' },
    { id: 'a' },
    { id: 'a' },
    { id: 'a' },
    { id: 'a' },
    { id: 'a' },
    { id: 'a' },
    { id: 'a' },
    { id: 'a' },
    { id: 'a' },
    { id: 'a' },
    { id: 'a' },
    { id: 'a' },
    { id: 'a' },
  ],
  questions: [
    {
      id: 'aaa123',
      question: 'How did you first find out about Anket?',
      details:
        'If you heard about Anket in multiple places, please choose the one that made you decide to finally sign up for an account.',
      questionType: 'multipleChoiceSingle',
      isRequired: true,
      order: 0,
      questionResponses: [],
      multipleChoiceOptions: [
        {
          id: 'aaa123',
          name: 'GitHub',
          multipleChoiceOptionSelections: [
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
          ],
        },
        {
          id: 'aaa123',
          name: 'Hacker News',
          multipleChoiceOptionSelections: [
            { id: 'a', selected: true },
            { id: 'a', selected: true },
          ],
        },
        {
          id: 'aaa123',
          name: 'Word of Mouth',
          multipleChoiceOptionSelections: [
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
          ],
        },
        {
          id: 'a',
          name: 'Other',
          multipleChoiceOptionSelections: [{ id: 'a', selected: true }],
        },
      ],
    },
    {
      id: 'a',
      question: 'How satisfied have you been with Anket so far?',
      details: '',
      isRequired: true,
      order: 1,
      questionType: 'zeroToTen',
      questionResponses: [
        { id: 'a', answerBoolean: null, answerText: null, answerNumeric: 3 },
        { id: 'a', answerBoolean: null, answerText: null, answerNumeric: 7 },
        { id: 'a', answerBoolean: null, answerText: null, answerNumeric: 9 },
        { id: 'a', answerBoolean: null, answerText: null, answerNumeric: 10 },
        { id: 'a', answerBoolean: null, answerText: null, answerNumeric: 8 },
        { id: 'a', answerBoolean: null, answerText: null, answerNumeric: 7 },
        { id: 'a', answerBoolean: null, answerText: null, answerNumeric: 4 },
        { id: 'a', answerBoolean: null, answerText: null, answerNumeric: 6 },
        { id: 'a', answerBoolean: null, answerText: null, answerNumeric: 7 },
        { id: 'a', answerBoolean: null, answerText: null, answerNumeric: 8 },
        { id: 'a', answerBoolean: null, answerText: null, answerNumeric: 8 },
        { id: 'a', answerBoolean: null, answerText: null, answerNumeric: 7 },
        { id: 'a', answerBoolean: null, answerText: null, answerNumeric: 5 },
        { id: 'a', answerBoolean: null, answerText: null, answerNumeric: 6 },
        { id: 'a', answerBoolean: null, answerText: null, answerNumeric: 9 },
      ],
      multipleChoiceOptions: [],
    },
    {
      id: 'a',
      question:
        'Which of these Question Types have you used in your surveys so far?',
      details:
        'Please select any that you have used in "real" surveys that you sent to people',
      isRequired: false,
      order: 2,
      questionType: 'multipleChoiceMultiple',
      multipleChoiceOptions: [
        {
          id: 'a',
          name: 'Multiple Choice (single response)',
          multipleChoiceOptionSelections: [
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
          ],
        },
        {
          id: 'a',
          name: 'Multiple Choice (multiple responses)',
          multipleChoiceOptionSelections: [
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
          ],
        },
        {
          id: 'a',
          name: 'Yes or No',
          multipleChoiceOptionSelections: [
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
          ],
        },
        {
          id: 'a',
          name: 'Zero to Ten',
          multipleChoiceOptionSelections: [
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
          ],
        },
        {
          id: 'a',
          name: 'Text Response',
          multipleChoiceOptionSelections: [
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
            { id: 'a', selected: true },
          ],
        },
      ],
      questionResponses: [],
    },
    {
      id: 'q4',
      question: 'Do you think Anket has brought value to your business?',
      details: 'We hope it has :)',
      isRequired: true,
      order: 3,
      questionType: 'yesNoBoolean',
      multipleChoiceOptions: [],
      questionResponses: [
        { id: 'a', answerBoolean: true, answerText: null, answerNumeric: null },
        { id: 'b', answerBoolean: true, answerText: null, answerNumeric: null },
        { id: 'c', answerBoolean: true, answerText: null, answerNumeric: null },
        { id: 'd', answerBoolean: true, answerText: null, answerNumeric: null },
        { id: 'e', answerBoolean: true, answerText: null, answerNumeric: null },
        { id: 'f', answerBoolean: true, answerText: null, answerNumeric: null },
        { id: 'g', answerBoolean: true, answerText: null, answerNumeric: null },
        { id: 'h', answerBoolean: true, answerText: null, answerNumeric: null },
        { id: 'i', answerBoolean: true, answerText: null, answerNumeric: null },
        { id: 'j', answerBoolean: true, answerText: null, answerNumeric: null },
        { id: 'k', answerBoolean: true, answerText: null, answerNumeric: null },
        {
          id: 'l',
          answerBoolean: false,
          answerText: null,
          answerNumeric: null,
        },
        {
          id: 'm',
          answerBoolean: false,
          answerText: null,
          answerNumeric: null,
        },
        {
          id: 'n',
          answerBoolean: false,
          answerText: null,
          answerNumeric: null,
        },
        {
          id: 'o',
          answerBoolean: false,
          answerText: null,
          answerNumeric: null,
        },
      ],
    },
    {
      id: 'a',
      question: 'What can we do to improve Anket in the future?',
      details: 'Any suggestions are welcome.',
      isRequired: false,
      order: 4,
      questionType: 'textResponse',
      multipleChoiceOptions: [],
      questionResponses: [
        {
          id: 'a',
          answerBoolean: null,
          answerText:
            "Anket has been great so far, but one thing that would really help us is a daily email digest of our survey responses so we don't need to visit the site to check how our surveys are doing.x",
          answerNumeric: null,
        },
        {
          id: 'a',
          answerBoolean: null,
          answerText: "It's great, no complaints!",
          answerNumeric: null,
        },
        {
          id: 'a',
          answerBoolean: null,
          answerText: 'Please make an iPhone app',
          answerNumeric: null,
        },
        {
          id: 'a',
          answerBoolean: null,
          answerText:
            'Have you considered finding a way to shoehorn a blockchain into this project?',
          answerNumeric: null,
        },
      ],
    },
  ],
};
