import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <div className='logo'>
        <h1>BITEBACK</h1>
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
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;
