export const tasksItems = [
  {
    id: 0,
    title: 'Complete Project Alpha',
    description: 'Work on the project and make sure to meet all the requirements.',
    status: 'In Progress',
    startDate: '2024-03-01',
    dueDate: '2024-04-15',
    priority: 'Urgent',
    importance: 'Yes',
  },
  {
    id: 1,
    title: 'Prepare Presentation',
    description: 'Create a compelling presentation for the upcoming meeting.',
    status: 'In Progress',
    startDate: '2022-03-05',
    dueDate: '2023-11-29',
    priority: 'Urgent',
    importance: 'Yes',
  },
  {
    id: 2,
    title: 'Review Codebase',
    description: 'Review and refactor the existing codebase for better maintainability.',
    status: 'In Progress',
    startDate: '2022-03-10',
    dueDate: '2023-12-02',
    priority: 'Urgent',
    importance: 'No',
  },
  {
    id: 3,
    title: 'Client Meeting',
    description: 'Schedule a meeting with the client to discuss project updates and feedback.',
    status: 'Completed',
    startDate: '2022-03-15',
    dueDate: '2022-03-20',
    priority: 'Urgent',
    importance: 'Yes',
  },
  {
    id: 4,
    title: 'Implement New Feature',
    description: 'Add a new feature to the application based on user feedback.',
    status: 'Completed',
    startDate: '2022-03-20',
    dueDate: '2022-04-05',
    priority: 'Urgent',
    importance: 'No',
  },
  {
    id: 5,
    title: 'QA Testing',
    description: 'Perform thorough testing of the application to identify and fix bugs.',
    status: 'Completed',
    startDate: '2022-03-25',
    dueDate: '2022-04-10',
    priority: 'Urgent',
    importance: 'Yes',
  },
  {
    id: 6,
    title: 'Team Meeting',
    description: 'Conduct a team meeting to discuss project progress and upcoming tasks.',
    status: 'Completed',
    startDate: '2022-04-01',
    dueDate: '2022-04-07',
    priority: 'Not Urgent',
    importance: 'No',
  },
  {
    id: 7,
    title: 'Documentation',
    description: 'Update project documentation with the latest changes and improvements.',
    status: 'Completed',
    startDate: '2022-04-05',
    dueDate: '2022-04-15',
    priority: 'Not Urgent',
    importance: 'Yes',
  },
  {
    id: 8,
    title: 'Client Demo',
    description: 'Prepare and conduct a demo for the client showcasing recent updates.',
    status: 'Completed',
    startDate: '2022-04-10',
    dueDate: '2022-04-12',
    priority: 'Not Urgent',
    importance: 'No',
  },
  {
    id: 9,
    title: 'Code Review',
    description: 'Participate in a code review session to ensure code quality and best practices.',
    status: 'Completed',
    startDate: '2022-04-15',
    dueDate: '2022-04-30',
    priority: 'Not Urgent',
    importance: 'Yes',
  },
  {
    id: 10,
    title: 'Feature Enhancement',
    description: 'Enhance an existing feature based on user feedback and usability testing.',
    status: 'Completed',
    startDate: '2022-04-20',
    dueDate: '2022-05-05',
    priority: 'Not Urgent',
    importance: 'No',
  },
  {
    id: 11,
    title: 'Project Evaluation',
    description: 'Evaluate the overall progress of the project and identify areas for improvement.',
    status: 'Overdue',
    startDate: '2022-04-25',
    dueDate: '2022-05-10',
    priority: 'Not Urgent',
    importance: 'Yes',
  },
]

function getRandomPriority() {
  const priorities = ['Urgent', 'Not Urgent']
  return priorities[Math.floor(Math.random() * priorities.length)]
}

function getRandomImportance() {
  const importanceLevels = ['Yes', 'No']
  return importanceLevels[Math.floor(Math.random() * importanceLevels.length)]
}

function getRandomStatus() {
  const statuses = ['In Progress', 'Completed']
  return statuses[Math.floor(Math.random() * statuses.length)]
}