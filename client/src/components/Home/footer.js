import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Join the Fitness Club to receive our best membership deals
        </p>
        <p className='footer-subscription-text'>
          You can unsubscribe at any time.
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
            />
            <Button buttonStyle='btn--outline'>Subscribe</Button>
          </form>
        </div>
      </section>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Membership</h2>
            <Link to='/'>Join TFC</Link>
            <Link to='/'>Try TFC for free</Link>
            <Link to='/'>Log into my account</Link>
            <Link to='/'>Teen Fitness</Link>
            <Link to='/'>Receipt Request</Link>
          </div>
          <div class='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/'>Contact</Link>
            <Link to='/'>Support</Link>
            <Link to='/'>About Us</Link>
            <Link to='/'>Book a class</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Careers</h2>
            <Link to='/'>Become a trainer</Link>
            <Link to='/'>Become a instructor</Link>
            <Link to='/'>Join our team</Link>
            <Link to='/'>Learn about benifits</Link>
          </div>
          <div class='footer-link-items'>
            <h2>Women</h2>
            <Link to='/'>Find classes for women</Link>
            <Link to='/'>Find training for women</Link>
            <Link to='/'>Find stuiods for women</Link>
          </div>
        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              TFC
              <i class='fab fa-typo3' />
            </Link>
          </div>
          <small class='website-rights'>TFC © 2022</small>
          <div class='social-icons'>
            <Link
              class='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i class='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;