import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <div className='logo'>BITEBACK</div>
      <div className='links'>
        <Link to={'/'} className='link'>
          Home
        </Link>
        <Link to={'/transactions'} className='link'>
          Transactions
        </Link>
        <p>Contact</p>
      </div>
    </nav>
  );
};
export default Navbar;
