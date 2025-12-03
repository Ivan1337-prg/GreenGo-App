import React, { useState, useEffect } from 'react';
import { FaGoogle, FaFacebook, FaApple, FaEnvelope, FaLock, FaCar, FaEye, FaEyeSlash, FaUser, FaSpinner } from 'react-icons/fa';
import { useAuth } from "./AuthContext";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState({
    google: false,
    facebook: false,
    apple: false
  });
  const [carPosition, setCarPosition] = useState(0);
  const [roadAnimation, setRoadAnimation] = useState(0);
  
  const { 
    loginWithGoogle, 
    loginWithFacebook, 
    loginWithApple, 
    loginWithEmail, 
    registerWithEmail,
    error: authError 
  } = useAuth();

  // Car animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCarPosition(prev => (prev + 1) % 100);
      setRoadAnimation(prev => prev + 1);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGoogleLogin = async () => {
    setSocialLoading(prev => ({ ...prev, google: true }));
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error('Google login error:', error);
    } finally {
      setSocialLoading(prev => ({ ...prev, google: false }));
    }
  };

  const handleFacebookLogin = async () => {
    setSocialLoading(prev => ({ ...prev, facebook: true }));
    try {
      await loginWithFacebook();
    } catch (error) {
      console.error('Facebook login error:', error);
    } finally {
      setSocialLoading(prev => ({ ...prev, facebook: false }));
    }
  };

  const handleAppleLogin = async () => {
    setSocialLoading(prev => ({ ...prev, apple: true }));
    try {
      await loginWithApple();
    } catch (error) {
      console.error('Apple login error:', error);
    } finally {
      setSocialLoading(prev => ({ ...prev, apple: false }));
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        await loginWithEmail(formData.email, formData.password);
      } else {
        await registerWithEmail(formData.email, formData.password, formData.name);
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Generate moving road lines
  const roadLines = Array.from({ length: 20 }, (_, i) => {
    const position = (roadAnimation + i * 50) % 600;
    return { id: i, position };
  });

  return (
    <div className="login-page-container">
      {/* Animated Background with Road and Car */}
      <div className="login-background">
        {/* Sky gradient */}
        <div className="sky-gradient"></div>
        
        {/* Moving road lines */}
        <div className="road-lines-container">
          {roadLines.map(line => (
            <div 
              key={line.id}
              className="road-line"
              style={{ top: `${line.position}px` }}
            ></div>
          ))}
        </div>
        
        {/* Road */}
        <div className="road"></div>
        
        {/* Animated Car */}
        <div 
          className="animated-car"
          style={{ 
            left: `${carPosition}%`,
            transform: `translateX(-50%) scale(${1 + Math.sin(carPosition * 0.05) * 0.1})`
          }}
        >
          <div className="car-body">
            <div className="car-top">
              <div className="car-window"></div>
              <div className="car-roof"></div>
            </div>
            <div className="car-middle">
              <div className="car-door">
                <div className="door-handle"></div>
              </div>
            </div>
            <div className="car-bottom">
              <div className="car-grill">
                <div className="car-logo">UNT</div>
              </div>
            </div>
            <div className="car-wheels">
              <div className="car-wheel front-wheel"></div>
              <div className="car-wheel rear-wheel"></div>
            </div>
            <div className="car-headlights">
              <div className="headlight left"></div>
              <div className="headlight right"></div>
            </div>
          </div>
        </div>

        {/* Roadside elements */}
        <div className="roadside-trees">
          {Array.from({ length: 8 }, (_, i) => (
            <div 
              key={i} 
              className="tree"
              style={{ 
                left: `${i * 15}%`,
                animationDelay: `${i * 0.5}s`
              }}
            >
              <div className="tree-trunk"></div>
              <div className="tree-leaves"></div>
            </div>
          ))}
        </div>

        {/* City skyline in distance */}
        <div className="city-skyline">
          {Array.from({ length: 10 }, (_, i) => (
            <div 
              key={i}
              className="building"
              style={{ 
                height: `${60 + Math.random() * 40}px`,
                width: `${20 + Math.random() * 30}px`,
                left: `${i * 10}%`,
                background: `linear-gradient(to bottom, #${Math.floor(Math.random()*16777215).toString(16)}, #${Math.floor(Math.random()*16777215).toString(16)})`
              }}
            >
              <div className="building-windows">
                {Array.from({ length: 6 }, (_, j) => (
                  <div key={j} className="window"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Login Form Card */}
      <div className="login-form-card">
        <div className="login-header">
          <div className="logo-container">
            <FaCar className="main-logo-icon" />
            <h1 className="app-title">GreenGo</h1>
          </div>
          <p className="app-tagline">
            Ride with UNT Eagles. Save money. Make friends.
          </p>
        </div>

        {/* Error Message */}
        {authError && (
          <div className="auth-error-message">
            <p>{authError}</p>
          </div>
        )}

        {/* Social Login Buttons */}
        <div className="social-login-buttons">
          <button 
            className="social-btn google-btn"
            onClick={handleGoogleLogin}
            disabled={socialLoading.google || loading}
          >
            <div className="btn-content">
              {socialLoading.google ? (
                <FaSpinner className="spinner-icon" />
              ) : (
                <FaGoogle />
              )}
              <span>Continue with Google</span>
            </div>
          </button>

          <button 
            className="social-btn facebook-btn"
            onClick={handleFacebookLogin}
            disabled={socialLoading.facebook || loading}
          >
            <div className="btn-content">
              {socialLoading.facebook ? (
                <FaSpinner className="spinner-icon" />
              ) : (
                <FaFacebook />
              )}
              <span>Continue with Facebook</span>
            </div>
          </button>

          <button 
            className="social-btn apple-btn"
            onClick={handleAppleLogin}
            disabled={socialLoading.apple || loading}
          >
            <div className="btn-content">
              {socialLoading.apple ? (
                <FaSpinner className="spinner-icon" />
              ) : (
                <FaApple />
              )}
              <span>Continue with Apple</span>
            </div>
          </button>
        </div>

        <div className="divider">
          <span>or sign in with email</span>
        </div>

        {/* Email Login Form */}
        <form className="email-login-form" onSubmit={handleEmailSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-with-icon">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required={!isLogin}
                  disabled={loading}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-with-icon">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="eagle@unt.edu"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon password-input">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
                disabled={loading}
                minLength="6"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {!isLogin && (
              <p className="password-requirement">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          {isLogin && (
            <div className="remember-forgot">
              <label className="remember-me">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <button type="button" className="forgot-password">
                Forgot password?
              </button>
            </div>
          )}

          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
          >
            {loading ? (
              <div className="loading-content">
                <FaSpinner className="spinner-icon" />
                <span>{isLogin ? 'Signing in...' : 'Creating account...'}</span>
              </div>
            ) : (
              <div className="btn-content">
                <FaCar />
                <span>{isLogin ? 'Sign In to GreenGo' : 'Create Account'}</span>
              </div>
            )}
          </button>
        </form>

        {/* Toggle between Login/Register */}
        <div className="form-toggle">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              className="toggle-btn"
              onClick={() => setIsLogin(!isLogin)}
              disabled={loading}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {/* Terms */}
        <div className="terms-container">
          <p>
            By continuing, you agree to GreenGo's{' '}
            <a href="#" className="terms-link">Terms of Service</a> and{' '}
            <a href="#" className="terms-link">Privacy Policy</a>
          </p>
        </div>

        {/* Campus Note */}
        <div className="campus-note">
          <p>🎓 UNT students get priority matching and discounted rides</p>
        </div>
      </div>
    </div>
  );
};

export default Login;