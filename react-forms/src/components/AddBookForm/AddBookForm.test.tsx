import React from 'react';
import { describe, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import AddBookForm from './AddBookForm';

describe('AddBookForm', () => {
  const onSubmit = vi.fn();

  beforeEach(() => {
    onSubmit.mockClear();
    render(<AddBookForm onSubmit={onSubmit} />);
  });

  it('onSubmit is called when all fields pass validation', async () => {
    const file = new File(['hello'], 'hello.png', { type: 'image/png' });

    const title = screen.getByRole('textbox', {
      name: /title:/i,
    });
    await user.type(title, 'War and Peace');

    const author = screen.getByRole('textbox', {
      name: /author:/i,
    });
    await user.type(author, 'Leo Tolstoy');

    const dropdown = screen.getByRole('combobox', {
      name: /type:/i,
    }) as HTMLSelectElement;
    const option = within(dropdown).getByRole('option', { name: /hardcover/i });
    await user.selectOptions(dropdown, option);

    const checkbox = screen.getByTestId('fantasy') as HTMLInputElement;
    await user.click(checkbox);

    const radio = screen.getByTestId('inStock') as HTMLInputElement;
    await user.click(radio);

    const published = screen.getByTestId('published');
    fireEvent.mouseDown(published);
    fireEvent.change(published, { target: { value: '2020-05-12' } });

    const pages = screen.getByRole('textbox', {
      name: /page count:/i,
    });
    await user.type(pages, '1100');

    const cover = screen.getByLabelText(/cover:/i) as HTMLInputElement;
    await user.upload(cover, file);

    const submit = screen.getByRole('button', {
      name: /submit/i,
    });

    expect(title).toHaveValue('War and Peace');
    expect(author).toHaveValue('Leo Tolstoy');
    expect(dropdown.value).to.equal('Hardcover');
    expect(checkbox.checked).toEqual(true);
    expect(radio.checked).toEqual(true);
    expect(published).toHaveValue('2020-05-12');
    expect(pages).toHaveValue('1100');
    expect(cover.files![0].name).toBe('hello.png');

    await user.click(submit);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    expect(onSubmit).toHaveBeenCalledWith({
      author: 'Leo Tolstoy',
      bookType: 'Hardcover',
      genres: ['Sci-Fi'],
      image: 'data:image/png;base64,aGVsbG8=',
      pages: '1100',
      published: '2020-05-12',
      stock: true,
      title: 'War and Peace',
    });
  });
});
