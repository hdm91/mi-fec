import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { authors, categories } from '../../../testData';
import VideoForm from './VideoForm';
import * as CategoryService from '../../../services/categories';
import * as AuthorService from '../../../services/authors';

jest.mock('../../../services/authors');
jest.mock('../../../services/categories');

const mockedAuthorService = jest.mocked(AuthorService, true);
const mockedCategoryService = jest.mocked(CategoryService, true);

describe('Video Form Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedAuthorService.getAuthors.mockResolvedValue(authors);
    mockedCategoryService.getCategories.mockResolvedValue(categories);
  });

  it('initial render', async () => {
    render(<VideoForm />);

    screen.getByRole('form');
    screen.getByLabelText('Author name');
    screen.getByLabelText('Video category');
  });

  it('initial values', async () => {
    const video = {
      id: 1,
      name: 'inception',
      authorId: 1,
      categories: [1, 2],
      formats: { one: { res: '1080p', size: 1200 } },
      releaseDate: '2018-08-12',
    };

    render(<VideoForm video={video} />);

    const videoName = screen.getByLabelText('Video name');
    //    const videoAuthor = screen.getByLabelText('Author name');

    expect(videoName).toHaveValue('inception');
    //    expect(videoAuthor).toHaveValue(1); not working!
  });

  it('should display author select with options', async () => {
    render(<VideoForm />);

    const authorsSelect = screen.getByLabelText('Author name');

    userEvent.click(authorsSelect);

    const authorsListBox = screen.getByRole('listbox');
    const authorOptions = await within(authorsListBox).findAllByRole('option');

    expect(authorOptions.length).toEqual(authors.length);
  });

  it('should display category select with options', async () => {
    render(<VideoForm />);

    const categorySelect = screen.getByLabelText('Video category');

    userEvent.click(categorySelect);

    const categoriyListBox = screen.getByRole('listbox');
    const categoryOptions = await within(categoriyListBox).findAllByRole('option');

    expect(categoryOptions.length).toEqual(categories.length);
  });
});
