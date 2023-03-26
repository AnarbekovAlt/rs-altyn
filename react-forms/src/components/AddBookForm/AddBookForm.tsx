import React, { Component } from 'react';
import styles from './AddBookForm.module.css';
import { FormData } from '../../types/types';
import TextInput from './TextInput';

interface Props {
  onSubmit: (formData: FormData) => void;
}

interface State {
  titleError: string;
  authorError: string;
  imagePreviewUrl: string | undefined;
  pagesError: string;
  genresError: string;
  bookTypeError: string;
  switcherIsPressed: boolean;
  switcherError: string;
  publishedError: string;
  coverError: string;
  submitted: boolean;
  formHasError: boolean;
}

// type Validation = string | boolean | number | null;

class AddBookForm extends Component<Props, State> {
  private titleRef = React.createRef<HTMLInputElement>();

  private authorRef = React.createRef<HTMLInputElement>();

  private stockRef = React.createRef<HTMLInputElement>();

  private bookTypeRef = React.createRef<HTMLSelectElement>();

  private publishedRef = React.createRef<HTMLInputElement>();

  private pagesRef = React.createRef<HTMLInputElement>();

  private imageRef = React.createRef<HTMLInputElement>();

  private fictionRef = React.createRef<HTMLInputElement>();

  private nonFictionRef = React.createRef<HTMLInputElement>();

  private fantasyRef = React.createRef<HTMLInputElement>();

  private scifiRef = React.createRef<HTMLInputElement>();

  private outOfStockRef = React.createRef<HTMLInputElement>();

  constructor(props: Props) {
    super(props);

    this.state = {
      titleError: '',
      authorError: '',
      pagesError: '',
      imagePreviewUrl: '',
      bookTypeError: '',
      genresError: '',
      switcherIsPressed: false,
      switcherError: '',
      publishedError: '',
      coverError: '',
      submitted: false,
      formHasError: false,
    };
  }

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { imagePreviewUrl } = this.state;
    const title = this.titleRef.current?.value || '';
    const published = this.publishedRef.current?.value || '';
    const stock = this.stockRef.current?.checked || false;
    const bookType = this.bookTypeRef.current?.value || '';
    const author = this.authorRef.current?.value || '';
    const pages = this.pagesRef.current?.value || '';
    const fiction = this.fictionRef.current?.checked;
    const nonFiction = this.nonFictionRef.current?.checked;
    const fantasy = this.fantasyRef.current?.checked || false;
    const scifi = this.scifiRef.current?.checked || false;

    const genresObjects = [
      { name: 'Fiction', checked: fiction },
      { name: 'Non-Fiction', checked: nonFiction },
      { name: 'Fantasy', checked: fantasy },
      { name: 'Sci-Fi', checked: scifi },
    ].filter((item) => item.checked);
    const genres = genresObjects.map((item) => item.name);

    this.resetErrors();

    await this.validateInput('titleError', title, '', 'This field must not be empty');

    await this.validateInput('authorError', author, '', 'This field must not be empty');
    if (author !== '') {
      await this.validateInput(
        'authorError',
        author.split(' ').every((word) => word[0].toUpperCase() === word[0]),
        false,
        'Every word must start from an uppercase letter'
      );
    }

    await this.validateInput('pagesError', pages, '', 'This field must not be empty');
    if (pages !== '') {
      await this.validateInput(
        'pagesError',
        /^\d+$/.test(pages),
        false,
        'Pages count must be a number'
      );
    }

    await this.validateInput('bookTypeError', bookType, 'default', 'Please select an option');

    await this.validateInput('genresError', genres.length, 0, 'Please select at least one genre');

    await this.validateInput(
      'switcherError',
      this.state.switcherIsPressed,
      false,
      'Please choose an option'
    );

    await this.validateInput('publishedError', published, '', 'This field must not be empty');
    if (published) {
      await this.validateInput(
        'publishedError',
        Date.parse(new Date().toISOString().split('T')[0]) - Date.parse(published) > 0,
        false,
        'Please choose a date before today'
      );
    }

    await this.validateInput(
      'coverError',
      this.state.imagePreviewUrl,
      '',
      'Please choose an image'
    );

    if (this.state.formHasError) return;

    const formData: FormData = {
      title,
      published,
      genres,
      stock,
      bookType,
      author,
      pages,
      image: imagePreviewUrl,
    };

    const { onSubmit } = this.props;
    onSubmit(formData);
    this.titleRef.current!.value = '';
    this.authorRef.current!.value = '';
    this.bookTypeRef.current!.value = 'default';
    this.fictionRef.current!.checked = false;
    this.nonFictionRef.current!.checked = false;
    this.fantasyRef.current!.checked = false;
    this.scifiRef.current!.checked = false;
    this.stockRef.current!.checked = false;
    this.outOfStockRef.current!.checked = false;
    this.publishedRef.current!.value = '';
    this.pagesRef.current!.value = '';
    this.imageRef.current!.value = '';
    this.setState({ imagePreviewUrl: '' });
    this.setState({ submitted: true });
  };

  resetErrors = () => {
    this.setState({ formHasError: false });
    this.setState({ titleError: '' });
    this.setState({ authorError: '' });
    this.setState({ bookTypeError: '' });
    this.setState({ genresError: '' });
    this.setState({ switcherError: '' });
    this.setState({ publishedError: '' });
    this.setState({ pagesError: '' });
    this.setState({ coverError: '' });
  };

  validateInput = <K extends keyof State, T>(
    key: K,
    value: T,
    condition: T,
    errorMessage: string
  ) => {
    return new Promise<void>((resolve) => {
      if (value === condition) {
        this.setState({ formHasError: true });
        this.setState({ [key]: errorMessage } as Pick<State, K>);
        this.setState({ submitted: false }, resolve);
      } else resolve();
    });
  };

  handleimageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({ imagePreviewUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    } else {
      this.setState({ imagePreviewUrl: undefined });
    }
  };

  render() {
    const {
      imagePreviewUrl,
      titleError,
      authorError,
      pagesError,
      bookTypeError,
      genresError,
      switcherError,
      publishedError,
      coverError,
      submitted,
    } = this.state;

    return (
      <form
        data-testid="addBookForm"
        className={styles['add-book-form']}
        onSubmit={this.handleSubmit}
      >
        <h2>Add Book</h2>

        <TextInput
          className={styles['input-container']}
          label="Title:"
          id="title"
          refer={this.titleRef}
        />
        {titleError !== '' && (
          <p data-testid="titleError" className={styles.error}>
            {' '}
            {titleError}{' '}
          </p>
        )}

        <TextInput
          className={styles['input-container']}
          label="Author:"
          id="author"
          refer={this.authorRef}
        />
        {authorError !== '' && (
          <p data-testid="authorError" className={styles.error}>
            {' '}
            {authorError}{' '}
          </p>
        )}
        <div className={styles['space-between']}>
          <div className={styles['input-container']}>
            <label htmlFor="bookType">
              Type:
              <select id="bookType" defaultValue="default" ref={this.bookTypeRef}>
                <option style={{ display: 'none' }} value="default" disabled>
                  --Select one--
                </option>
                <option value="Hardcover">Hardcover</option>
                <option value="Paperback">Paperback</option>
                <option value="eBook">eBook</option>
              </select>
              {bookTypeError !== '' && (
                <p data-testid="bookTypeError" className={styles.error}>
                  {' '}
                  {bookTypeError}{' '}
                </p>
              )}
            </label>
          </div>
        </div>

        <div className={styles.genres}>
          <label className={styles.stock} htmlFor="stock">
            Fiction
            <input id="fiction" type="checkbox" ref={this.fictionRef} />
          </label>
          <label className={styles.stock} htmlFor="stock">
            Non-Fiction
            <input id="non-fiction" type="checkbox" ref={this.nonFictionRef} />
          </label>
          <label className={styles.stock} htmlFor="stock">
            Sci-Fi
            <input id="sci-fi" type="checkbox" ref={this.fantasyRef} />
          </label>
          <label className={styles.stock} htmlFor="stock">
            Fantasy
            <input data-testid="fantasy" id="fantasy" type="checkbox" ref={this.scifiRef} />
          </label>
          {genresError !== '' && (
            <p data-testid="genresError" className={styles.error}>
              {' '}
              {genresError}{' '}
            </p>
          )}
        </div>
        <div className="switch-field">
          <div className="switch-title">Availabity</div>
          <input
            data-testid="inStock"
            type="radio"
            id="switch_left"
            name="switchToggle"
            value="In Stock"
            onChange={(e) => console.log('In Stock', e.target.value)}
            ref={this.stockRef}
            onClick={() => {
              this.setState({ switcherIsPressed: true });
            }}
          />
          <label htmlFor="switch_left">In Stock</label>

          <input
            type="radio"
            id="switch_right"
            name="switchToggle"
            value="Out of Stock"
            onChange={(e) => console.log('Out of stock', e.target.value)}
            onClick={() => {
              this.setState({ switcherIsPressed: true });
            }}
            ref={this.outOfStockRef}
          />
          <label htmlFor="switch_right">Out of Stock</label>
          {switcherError !== '' && (
            <p data-testid="stockError" className={styles.error}>
              {' '}
              {switcherError}{' '}
            </p>
          )}
        </div>
        <div>
          <label className="input-field date" htmlFor="published">
            Published:
            <input
              onChange={(e) => console.log(e)}
              data-testid="published"
              id="published"
              type="date"
              ref={this.publishedRef}
            />
            {publishedError !== '' && (
              <p data-testid="publishedError" className={styles.error}>
                {' '}
                {publishedError}{' '}
              </p>
            )}
          </label>
        </div>
        <TextInput
          className={styles['input-container']}
          label="Page count:"
          id="pages"
          refer={this.pagesRef}
        />
        {pagesError !== '' && (
          <p data-testid="pagesError" className={styles.error}>
            {' '}
            {pagesError}{' '}
          </p>
        )}
        <div className={styles['input-container']}>
          <label htmlFor="cover">
            Cover:
            <input
              id="cover"
              type="file"
              accept="image/*"
              ref={this.imageRef}
              onChange={this.handleimageChange}
            />
            {coverError !== '' && (
              <p data-testid="coverError" className={styles.error}>
                {' '}
                {coverError}{' '}
              </p>
            )}
            {imagePreviewUrl && (
              <div className={styles.preview}>
                <img src={imagePreviewUrl} alt="Preview" />
              </div>
            )}
          </label>
        </div>
        <div className={styles['button-container']}>
          <button type="submit">Submit</button>
        </div>
        {submitted && <p className={styles.submitted}>Card successfully created</p>}
      </form>
    );
  }
}

export default AddBookForm;
