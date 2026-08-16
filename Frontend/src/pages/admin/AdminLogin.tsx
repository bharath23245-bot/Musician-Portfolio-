import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  UserPlus,
  LogIn,
  Check,
  ArrowLeft,
  KeyRound,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { hashPassword } from '../../services/authService';

export const AdminLogin: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/admin';

  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('Bharath Kannan');
  const [email, setEmail] = useState('manager@maestro.io');
  const [password, setPassword] = useState('Maestro@2025#Studio');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [encryptionStatus, setEncryptionStatus] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  // Strong password rule checks
  const rules = useMemo(() => {
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]/.test(password);

    let score = 0;
    if (hasMinLength) score += 1;
    if (hasUppercase) score += 1;
    if (hasNumber) score += 1;
    if (hasSpecialChar) score += 1;

    return {
      hasMinLength,
      hasUppercase,
      hasNumber,
      hasSpecialChar,
      score,
      isStrong: score === 4,
    };
  }, [password]);

  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = [
    'bg-red-600',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-blue-500',
    'bg-emerald-500',
  ];

  const getResolvedName = () => {
    if (name.trim()) return name.trim();
    if (email.includes('@')) {
      const prefix = email.split('@')[0];
      return prefix.charAt(0).toUpperCase() + prefix.slice(1);
    }
    return 'Bharath Kannan';
  };

  const handleGenerateStrongPassword = () => {
    const charsUpper = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const charsLower = 'abcdefghijkmnpqrstuvwxyz';
    const charsNumbers = '23456789';
    const charsSpecial = '@#$%&*!';

    let generated = '';
    generated += charsUpper.charAt(Math.floor(Math.random() * charsUpper.length));
    generated += charsLower.charAt(Math.floor(Math.random() * charsLower.length));
    generated += charsNumbers.charAt(Math.floor(Math.random() * charsNumbers.length));
    generated += charsSpecial.charAt(Math.floor(Math.random() * charsSpecial.length));

    const all = charsUpper + charsLower + charsNumbers + charsSpecial;
    for (let i = 0; i < 8; i++) {
      generated += all.charAt(Math.floor(Math.random() * all.length));
    }

    setPassword(generated);
    if (authMode === 'signup') {
      setConfirmPassword(generated);
    }
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (authMode === 'signup') {
      if (!name.trim()) {
        setErrorMsg('Please enter your full name / artist name.');
        return;
      }
      if (!rules.isStrong) {
        setErrorMsg(
          'Please create a strong password meeting all 4 security criteria below (8+ chars, uppercase, number, special char).'
        );
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match. Please verify.');
        return;
      }
    } else {
      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters.');
        return;
      }
    }

    setIsLoading(true);
    setEncryptionStatus('Encrypting credentials with SHA-256...');

    const encryptedHash = await hashPassword(password);
    setEncryptionStatus(`Encrypted Token: ${encryptedHash.slice(0, 16)}...`);

    const resolvedName = getResolvedName();
    setTimeout(async () => {
      await login(email, encryptedHash, resolvedName);
      setIsLoading(false);
      setEncryptionStatus('');
      navigate(from, { replace: true });
    }, 600);
  };

  const handleQuickDemoLogin = async () => {
    setName('Bharath Kannan');
    setEmail('manager@maestro.io');
    const demoPass = 'Maestro@2025#Studio';
    setPassword(demoPass);
    setIsLoading(true);
    setEncryptionStatus('Authenticating Maestro credentials...');
    const encryptedHash = await hashPassword(demoPass);

    setTimeout(async () => {
      await login('manager@maestro.io', encryptedHash, 'Bharath Kannan');
      setIsLoading(false);
      setEncryptionStatus('');
      navigate(from, { replace: true });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-[#e1e3e6] flex flex-col justify-between font-sans selection:bg-[#c8a251]/30 selection:text-[#faeed1]">
      {/* Top Bar */}
      <header className="px-6 sm:px-12 py-6 flex items-center justify-between border-b border-[#18191f]/80">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8e93a3] hover:text-[#c8a251] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Public Portfolio</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#c8a251] animate-pulse"></div>
          <span className="text-xs uppercase tracking-[0.2em] font-serif text-white">
            MAESTRO SECURE PORTAL
          </span>
        </div>
      </header>

      {/* Main Login Box */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="relative w-full max-w-md bg-[#131418] border border-[#262833] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c8a251]/20 to-[#dfba68]/10 border border-[#c8a251]/40 flex items-center justify-center mx-auto text-[#c8a251] shadow-inner">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif text-[#f2f4f8] font-normal tracking-wide">
              {authMode === 'signin' ? 'Artist & Management Portal' : 'Register Admin Account'}
            </h1>
            <p className="text-xs text-[#8f94a4]">
              {authMode === 'signin'
                ? 'Sign in to access your discography, concert schedules, and inquiries.'
                : 'Create management credentials with strong encryption.'}
            </p>
          </div>

          {/* Quick Demo Access Badge */}
          <div className="p-3 rounded-lg bg-[#1a1b22] border border-[#2b2e3a] flex items-center justify-between gap-3 text-xs">
            <div className="min-w-0">
              <span className="font-semibold text-white block truncate">
                Pre-configured Demo Credentials
              </span>
              <span className="text-[#8e93a3] text-[11px] font-mono truncate block">
                manager@maestro.io
              </span>
            </div>
            <button
              type="button"
              id="quick-demo-login-btn"
              onClick={handleQuickDemoLogin}
              disabled={isLoading}
              className="px-3 py-1.5 bg-[#c8a251] hover:bg-[#d6b25f] text-[#0b0c0e] font-semibold text-[11px] uppercase tracking-wider rounded transition-all flex-shrink-0 active:scale-95 shadow-sm"
            >
              1-Click Demo Login
            </button>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 p-1 rounded-lg bg-[#0e0f12] border border-[#21232b] text-xs">
            <button
              type="button"
              onClick={() => {
                setAuthMode('signin');
                setErrorMsg('');
              }}
              className={`py-2 rounded-md font-medium transition-all flex items-center justify-center gap-1.5 ${
                authMode === 'signin'
                  ? 'bg-[#1e2028] text-white shadow-sm font-semibold'
                  : 'text-[#858a99] hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMode('signup');
                setErrorMsg('');
              }}
              className={`py-2 rounded-md font-medium transition-all flex items-center justify-center gap-1.5 ${
                authMode === 'signup'
                  ? 'bg-[#1e2028] text-white shadow-sm font-semibold'
                  : 'text-[#858a99] hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register</span>
            </button>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/60 text-xs text-red-300 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {authMode === 'signup' && (
              <div>
                <label className="block text-[11px] font-medium text-[#9ba0ad] mb-1 uppercase tracking-wider">
                  Full Name / Artist Representation *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bharath Kannan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#191a20] border border-[#282a35] focus:border-[#c8a251] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block text-[11px] font-medium text-[#9ba0ad] mb-1 uppercase tracking-wider">
                Management Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#686c7b]" />
                <input
                  type="email"
                  required
                  placeholder="manager@maestro.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#191a20] border border-[#282a35] focus:border-[#c8a251] rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-medium text-[#9ba0ad] uppercase tracking-wider">
                  Password *
                </label>
                {authMode === 'signup' && (
                  <button
                    type="button"
                    onClick={handleGenerateStrongPassword}
                    className="text-[10px] text-[#c8a251] hover:underline flex items-center gap-1 font-medium"
                  >
                    <KeyRound className="w-3 h-3" />
                    Auto-Generate Strong
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#686c7b]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#191a20] border border-[#282a35] focus:border-[#c8a251] rounded-lg pl-9 pr-10 py-2.5 text-sm text-white focus:outline-none transition-colors font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#727685] hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Indicator for Register */}
              {authMode === 'signup' && (
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-[#8a8f9f]">
                      Strength:{' '}
                      <span className="font-semibold text-white">
                        {strengthLabels[rules.score]}
                      </span>
                    </span>
                    <span className="text-[#8a8f9f]">{rules.score}/4 criteria</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#1e2029] rounded-full overflow-hidden flex gap-1">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`h-full flex-1 transition-colors ${
                          rules.score >= step
                            ? strengthColors[rules.score]
                            : 'bg-transparent'
                        }`}
                      />
                    ))}
                  </div>

                  {/* 4 Criteria Checklist */}
                  <div className="grid grid-cols-2 gap-1 text-[11px] pt-1">
                    <span
                      className={
                        rules.hasMinLength ? 'text-emerald-400 flex items-center gap-1' : 'text-[#6b707f]'
                      }
                    >
                      <Check className="w-3 h-3 inline" /> 8+ Characters
                    </span>
                    <span
                      className={
                        rules.hasUppercase ? 'text-emerald-400 flex items-center gap-1' : 'text-[#6b707f]'
                      }
                    >
                      <Check className="w-3 h-3 inline" /> 1+ Uppercase
                    </span>
                    <span
                      className={
                        rules.hasNumber ? 'text-emerald-400 flex items-center gap-1' : 'text-[#6b707f]'
                      }
                    >
                      <Check className="w-3 h-3 inline" /> 1+ Number
                    </span>
                    <span
                      className={
                        rules.hasSpecialChar
                          ? 'text-emerald-400 flex items-center gap-1'
                          : 'text-[#6b707f]'
                      }
                    >
                      <Check className="w-3 h-3 inline" /> 1+ Special Char
                    </span>
                  </div>
                </div>
              )}
            </div>

            {authMode === 'signup' && (
              <div>
                <label className="block text-[11px] font-medium text-[#9ba0ad] mb-1 uppercase tracking-wider">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#191a20] border border-[#282a35] focus:border-[#c8a251] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors font-mono"
                />
              </div>
            )}

            {authMode === 'signin' && (
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-[#9aa0ae] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-[#1e2028] border-[#2f3240] text-[#c8a251] focus:ring-0"
                  />
                  <span>Remember session</span>
                </label>

                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-[#c8a251] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {encryptionStatus && (
              <div className="p-2.5 rounded bg-[#101115] border border-[#232530] text-[11px] font-mono text-[#c8a251] flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 animate-spin" />
                <span>{encryptionStatus}</span>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                id="admin-submit-auth-btn"
                disabled={isLoading}
                className="w-full py-3 bg-[#c8a251] hover:bg-[#d6b25f] text-[#0b0c0e] font-semibold rounded-lg text-xs uppercase tracking-widest transition-all shadow-lg active:scale-98 disabled:opacity-60"
              >
                {isLoading
                  ? 'Processing Encrypted Auth...'
                  : authMode === 'signin'
                  ? 'Authorize & Enter Studio'
                  : 'Create & Encrypt Credentials'}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-[#15161b] border border-[#272935] rounded-xl p-6 text-white space-y-4 shadow-2xl">
            <h3 className="text-xl font-serif">Reset Management Credentials</h3>
            {forgotSubmitted ? (
              <div className="space-y-3 text-xs text-center py-4">
                <Check className="w-8 h-8 text-[#c8a251] mx-auto" />
                <p className="text-[#c7cbd8]">
                  If an account exists for <span className="text-white">{forgotEmail}</span>, a
                  secure one-time recovery token has been prepared.
                </p>
                <button
                  onClick={() => {
                    setShowForgotModal(false);
                    setForgotSubmitted(false);
                  }}
                  className="px-5 py-2 bg-[#c8a251] text-[#0b0c0e] rounded text-xs font-semibold uppercase"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setForgotSubmitted(true);
                }}
                className="space-y-3 text-xs"
              >
                <p className="text-[#8e93a3]">
                  Enter your registered artist email to receive a password reset token.
                </p>
                <input
                  type="email"
                  required
                  placeholder="manager@maestro.io"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full bg-[#1a1b22] border border-[#2d303e] rounded p-2 text-white"
                />
                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-[#c8a251] text-[#0b0c0e] font-semibold rounded uppercase"
                  >
                    Send Token
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-4 py-2 border border-[#2d303e] rounded text-[#8e93a3]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-[#525663] border-t border-[#18191f]/80">
        MAESTRO Management Architecture • Secure Cryptographic Session Handshake
      </footer>
    </div>
  );
};
