import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
  return (
    <nav>
      <div className='logo'>
        <h1>
          <Link className='link' to={'/'}>
            BITEBACK
          </Link>
        </h1>
      </div>
      <div className='links'>
        <Link to={'/'} className='link'>
          Home
        </Link>
        <Link to={'/transactions'} className='link'>
          Transactions
        </Link>
        <Link to={'/contact'} className='link'>
          Contact
          <FontAwesomeIcon icon='fa-solid fa-arrow-down' />
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
