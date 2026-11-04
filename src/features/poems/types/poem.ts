export type PoemType = 'soneto' | 'haicai' | 'trova' | 'livre';

export type Poem = {
  id: string;
  notebookId: string;
  title: string;
  content: string;
  type: PoemType;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
};
