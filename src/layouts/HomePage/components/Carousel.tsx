
import { ReturnBook } from "./ReturnBook";
import {useEffect, useState} from "react";
import BookModel from "../../../models/BookModel";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";

export const Carousel = () => {

    const [books,setBooks] = useState<BookModel[]>([]);
    const [isLoading,setIsLoading] = useState(true);
    const [httpError,setHttpError]=useState(null);

    useEffect(()=>{
        const fetchBooks = async () =>{
            const baseUrl: string="http://localhost:8080/api/books";
            const url: string = `${baseUrl}?page=0&&size=9`;
            const response = await fetch(url);

            if(!response.ok){
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();
            const responseData = responseJson._embedded.books;
            const loadedBooks: BookModel[] = [];

            for (const key in responseData) {
                loadedBooks.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    author: responseData[key].author,
                    desciption: responseData[key].description,
                    copies: responseData[key].copies,
                    copiesAvailable: responseData[key].copiesAvailable,
                    category: responseData[key].category,
                    img: responseData[key].img,
                });
            }

            setBooks(loadedBooks);
            setIsLoading(false);




    }
        fetchBooks().catch((error:any)=>{
            setIsLoading(false);
            setHttpError(error.message); 
        })

    },[]);

    if(isLoading){
        return ( 
          <SpinnerLoading/>
        )
    }
    if(httpError){
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }


    return (
        <div className='container mt-5' style={{ height: 550 }}>
            <div className='homepage-carousel-title'>
                <h3>Find your next "I stayed up too late reading" book.</h3>
            </div>
            <div id='carouselExampleControls' className='carousel carousel-dark slide mt-5 
                d-none d-lg-block' data-bs-interval='false'>

                {/* Desktop */}
                <div className='carousel-inner'>
                    <div className='carousel-item active'>
                        <div className='row d-flex justify-content-center align-items-center'>
                            {books.slice(0,3).map(book => (
                            <ReturnBook book={book} key={book.id}/>
                            ))}
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                        {books.slice(3,6).map(book => (
                            <ReturnBook book={book} key={book.id}/>
                            ))}
                        </div>
                    </div>
                    <div className='carousel-item'>
                        <div className='row d-flex justify-content-center align-items-center'>
                        {books.slice(6,9).map(book => (
                            <ReturnBook book={book} key={book.id}/>
                            ))}
                        </div>
                    </div>
                    <button className='carousel-control-prev' type='button'
                        data-bs-target='#carouselExampleControls' data-bs-slide='prev'>
                        <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Previous</span>
                    </button>
                    <button className='carousel-control-next' type='button'
                        data-bs-target='#carouselExampleControls' data-bs-slide='next'>
                        <span className='carousel-control-next-icon' aria-hidden='true'></span>
                        <span className='visually-hidden'>Next</span>
                    </button>
                </div>
            </div>

            {/* Mobile */}
            <div className='d-lg-none mt-3'>
                <div className='row d-flex justify-content-center align-items-center'>
                <ReturnBook book={books[7]} key={books[7].id}/>
                </div>
            </div>
            <div className='homepage-carousel-title mt-3'>
                <Link className='btn btn-outline-secondary btn-lg' to='/search'>View More</Link>
            </div>
        </div>
    );
}


/*
Sure, I can help you understand the React component using Bootstrap. Here is a line-by-line explanation of the Carousel component:

The first line export const Carousel = () => { defines a function component named Carousel and exports it for use in other files.
The second line return ( starts the return statement of the component, which contains the JSX code for rendering the carousel.
The third line <div className='container mt-5' style={{ height: 550 }}> creates a div element with the Bootstrap classes container and mt-5, which center the content and add some margin-top, respectively. It also sets the inline style of the div to have a height of 550 pixels.
The fourth line <div className='homepage-carousel-title'> creates another div element with a custom class homepage-carousel-title, which can be used to style the title of the carousel.
The fifth line <h3>Find your next "I stayed up too late reading" book.</h3> creates an h3 element with the text “Find your next “I stayed up too late reading” book.”, which serves as the title of the carousel.
The sixth line </div> closes the div element for the title.
The seventh line <div id='carouselExampleControls' className='carousel carousel-dark slide mt-5 d-none d-lg-block' data-bs-interval='false'> creates another div element with the id carouselExampleControls, which is used to identify the carousel and control its behavior. It also has the Bootstrap classes carousel, carousel-dark, slide, mt-5, d-none, and d-lg-block, which enable the carousel functionality, set the dark theme, add the slide animation, add some margin-top, hide the element on small screens, and show it on large screens, respectively. It also has the data attribute data-bs-interval='false', which disables the automatic sliding of the carousel items.
The eighth line  Desktop  is a comment that indicates that the following code is for the desktop version of the carousel.
The ninth line <div className='carousel-inner'> creates another div element with the Bootstrap class carousel-inner, which wraps the carousel items.
The tenth line <div className='carousel-item active'> creates another div element with the Bootstrap class carousel-item, which represents a single item in the carousel. It also has the class active, which indicates that this item is the first one to be shown.
The eleventh line <div className='row d-flex justify-content-center align-items-center'> creates another div element with the Bootstrap classes row, d-flex, justify-content-center, and align-items-center, which create a row layout, enable the flexbox display, center the content horizontally and vertically, respectively.
The twelfth line <div className='col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'> creates another div element with the Bootstrap classes col-xs-6, col-sm-6, col-md-4, col-lg-3, and mb-3, which define the column width for different screen sizes and add some margin-bottom, respectively.
The thirteenth line <div className='text-center'> creates another div element with the Bootstrap class text-center, which aligns the text to the center.
The fourteenth line <img src={require('./../../Images/BooksImages/book-luv2code-1000.png')} width='151' height='233' alt="book" /> creates an img element with the src attribute set to the path of the image file, the width and height attributes set to the dimensions of the image, and the alt attribute set to the alternative text for the image.
The fifteenth line <h6 className='mt-2'>Book</h6> creates an h6 element with the Bootstrap class mt-2, which adds some margin-top, and the text “Book”, which serves as the label for the image.
The sixteenth line <p>Luv2Code</p> creates a p element with the text “Luv2Code”, which serves as the title of the book.
The seventeenth line <a className='btn main-color text-white' href='#'>Reserve</a> creates an a element with the Bootstrap class btn, a custom class main-color, and the class text-white, which style the element as a button with a custom color and white text, respectively. It also has the href attribute set to “#”, which is a placeholder for the link, and the text “Reserve”, which serves as the button text.
The eighteenth line </div> closes the div element for the text-center.
The nineteenth line </div> closes the div element for the column.
The twentieth line </div> closes the div element for the row.
The twenty-first line </div> closes the div element for the carousel item.
The next three blocks of code from lines 22 to 46 are similar to the previous block, except that they have different images and titles for the books, and they do not have the class active for the carousel items, since they are not the first ones to be shown.
The forty-seventh line <button className='carousel-control-prev' type='button' data-bs-target='#carouselExampleControls' data-bs-slide='prev'> creates a button element with the Bootstrap class carousel-control-prev, which styles the element as a previous control for the carousel. It also has the type attribute set to “button”, which specifies the button type, and the data attributes data-bs-target='#carouselExampleControls' and data-bs-slide='prev', which link the button to the carousel and trigger the previous slide, respectively.
The forty-eighth line <span className='carousel-control-prev-icon' aria-hidden='true'></span> creates a span element with the Bootstrap class carousel-control-prev-icon, which displays the icon for the previous control. It also has the aria-hidden attribute set to “true”, which hides the element from screen readers.
The forty-ninth line <span className='visually-hidden'>Previous</span> creates a span element with the Bootstrap class visually-hidden, which hides the element from sight but not from screen readers. It also has the text “Previous”, which serves as the accessible label for the button.
The fiftieth line </button> closes the button element for the previous control.
The fifty-first line <button cl is incomplete, but it is likely to be the start of the button element for the next control, which would have the Bootstrap class carousel-control-next and the data attribute data-bs-slide='next'.

*/