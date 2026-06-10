'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { SectionHeader } from './SectionHeader';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const CONTACT_SUBJECT_KEY = 'contact-subject';

export function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [subject, setSubject] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  // Sources for a pre-filled subject:
  //  (a) sessionStorage on initial mount (covers F5 mid-flow + cross-tab)
  //  (b) custom 'contact-prefill' event from WorkModal during a single session
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(CONTACT_SUBJECT_KEY);
      if (stored) {
        setSubject(stored);
        sessionStorage.removeItem(CONTACT_SUBJECT_KEY);
      }
    } catch {
      /* sessionStorage may be disabled — silently skip */
    }

    const onPrefill = (e: Event) => {
      const detail = (e as CustomEvent<{ subject?: string }>).detail;
      if (detail?.subject) setSubject(detail.subject);
    };
    window.addEventListener('contact-prefill', onPrefill as EventListener);
    return () =>
      window.removeEventListener('contact-prefill', onPrefill as EventListener);
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    // Client-side validation: focus first invalid field so screen readers
    // and keyboard users land on the problem, not at the top of the form.
    if (!form.checkValidity()) {
      const firstInvalid = form.querySelector<HTMLInputElement | HTMLTextAreaElement>(
        ':invalid',
      );
      firstInvalid?.focus();
      setError('Please fill in all fields before sending.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setError(null);
    const data = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/xpqnvkbe', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        const json = await res.json().catch(() => null);
        setError(
          json?.error ||
            "Couldn't send. Try again, or email hello@miguelborges.dev directly.",
        );
        setStatus('error');
      }
    } catch {
      setError(
        "Network error. Try again, or email hello@miguelborges.dev directly.",
      );
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="relative w-full px-6 md:px-10 py-20 md:py-40">
      <div className="mx-auto max-w-wide">
        <div className="section-enter" style={{ ['--d' as any]: '0ms' }}>
          <SectionHeader
            title={
              <>
                Let&apos;s build
                <br />
                something together.
              </>
            }
          />
        </div>

        <div
          className="section-enter grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20"
          style={{ ['--d' as any]: '100ms' }}
        >
          {/* LEFT — Form */}
          <div>
            {status === 'success' ? (
              <SuccessState />
            ) : (
              <form
                ref={formRef}
                onSubmit={onSubmit}
                action="https://formspree.io/f/xpqnvkbe"
                method="POST"
                className="max-w-[520px]"
                aria-describedby="form-help"
                noValidate
              >
                {/* Hidden subject — Formspree maps _subject to the email's
                    Subject line. Updates as `subject` state changes. */}
                {subject ? (
                  <input type="hidden" name="_subject" value={subject} />
                ) : null}

                {subject ? (
                  <div className="flex items-center gap-3 mb-4 px-3 py-2 border border-flash/40 bg-flash/[0.06] rounded-[4px]">
                    <span
                      aria-hidden
                      className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-flash"
                    >
                      Re:
                    </span>
                    <span className="font-mono text-[12px] text-bone flex-1 truncate">
                      {subject}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSubject(null)}
                      aria-label="Clear subject"
                      className="press font-mono text-[14px] leading-none text-muted hover:text-bone transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ) : null}

                <p
                  id="form-help"
                  className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted-soft mb-4"
                >
                  All fields required
                </p>

                <div className="space-y-1">
                  <Field
                    name="name"
                    label="Name"
                    autoComplete="name"
                    required
                    placeholder="Your name"
                  />
                  <Field
                    name="email"
                    type="email"
                    label="Email"
                    autoComplete="email"
                    required
                    placeholder="your@email.com"
                  />
                  <Field
                    name="message"
                    label="Message"
                    autoComplete="off"
                    required
                    placeholder="What are you building?"
                    multiline
                  />
                </div>

                <div className="mt-10 flex items-center justify-between gap-6">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    aria-busy={status === 'submitting'}
                    className="press group inline-flex items-center gap-3 px-6 py-3 min-h-[44px] border border-bone/40 text-bone font-mono text-[12px] tracking-[0.14em] uppercase hover:border-flash hover:text-flash transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span>{status === 'submitting' ? 'Sending' : 'Send'}</span>
                    {status === 'submitting' ? (
                      <span aria-hidden className="spinner" />
                    ) : (
                      <span
                        aria-hidden
                        className="transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    )}
                  </button>

                  {/* Live region — announces errors to screen readers without stealing focus */}
                  <div className="min-h-[20px]" aria-live="polite" role="status">
                    {error ? (
                      <p className="font-mono text-[11px] text-red-300/90">{error}</p>
                    ) : (
                      <p className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted-soft">
                        Reply within 24h
                      </p>
                    )}
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT — Contact info */}
          <div className="md:pl-8">
            <p className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted-soft mb-4">
              Direct
            </p>
            <a
              href="mailto:hello@miguelborges.dev"
              className="press inline-block font-hero font-black text-bone hover:text-flash transition-colors leading-[1.05] tracking-tight"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
            >
              hello@miguelborges.dev
            </a>

            <div className="mt-10">
              <p className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted-soft mb-4">
                Elsewhere
              </p>
              <ul className="space-y-2.5">
                <SocialLink href="https://www.linkedin.com/in/miguelcborges/" label="LinkedIn" />
                <SocialLink href="https://github.com/mborges-dev" label="GitHub" />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = 'text',
  required,
  placeholder,
  multiline,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  multiline?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block py-2">
      <span className="block font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted-soft mb-1">
        {label}
      </span>
      {multiline ? (
        <textarea
          name={name}
          rows={5}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-required={required ? 'true' : undefined}
          className="field min-h-[140px]"
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-required={required ? 'true' : undefined}
          className="field"
        />
      )}
    </label>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="press group inline-flex items-center gap-3 py-2 -my-2 font-mono text-[14px] text-bone hover:text-flash transition-colors"
      >
        <span className="min-w-[80px]">{label}</span>
        <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
      </a>
    </li>
  );
}

function SuccessState() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="border border-hairline p-8 max-w-[520px]"
    >
      <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] uppercase text-flash">
        <span className="pulse-dot" aria-hidden />
        <span>Message sent</span>
      </div>
      <p className="mt-5 text-[18px] leading-[1.5] text-bone">
        Thanks — I&apos;ll reply within 24h. Usually faster.
      </p>
      <p className="mt-3 text-[14px] text-muted">
        In the meantime, feel free to email me directly at{' '}
        <a href="mailto:hello@miguelborges.dev" className="text-flash hover:underline">
          hello@miguelborges.dev
        </a>
        .
      </p>
    </div>
  );
}
