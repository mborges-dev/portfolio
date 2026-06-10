'use client';

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from 'react';
import { createPortal } from 'react-dom';
import {
  projectDeepDives,
  slugFor,
  type CtaContact,
  type CtaExternal,
  type CtaWaitlist,
  type InlineImage,
  type InlineImagePlacement,
  type ProjectDeepDive,
} from '@/content/projects';
import type { Work } from './WorkCard';

type Props = {
  project: Work | null;
  onClose: () => void;
};

/** sessionStorage key Contact reads on mount to pre-fill the subject line. */
const CONTACT_SUBJECT_KEY = 'contact-subject';

/** Formspree endpoint — same as Contact section. Waitlist submissions land
 *  in the same inbox; the _subject + source fields make them filterable. */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpqnvkbe';

/** localStorage key recording that the user has signed up for the Almi
 *  waitlist. Read on Footer mount so re-visits skip straight to success. */
const ALMI_WAITLIST_KEY = 'almi-waitlist-submitted';

const PLACEMENT_KEYS: InlineImagePlacement[] = [
  'after-header',
  'after-approach',
  'after-stack-rationale',
];

export function WorkModal({ project, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  // ESC + body scroll lock + focus management
  useEffect(() => {
    if (!project) return;

    setWaitlistOpen(false); // Reset on every open

    previousFocus.current =
      typeof document !== 'undefined'
        ? (document.activeElement as HTMLElement)
        : null;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = setTimeout(() => closeRef.current?.focus(), 60);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = originalOverflow;
      clearTimeout(focusTimer);
      previousFocus.current?.focus?.();
    };
  }, [project, onClose]);

  if (!project || typeof document === 'undefined') return null;

  const slug = slugFor(project.title);
  const content: ProjectDeepDive | undefined = projectDeepDives[slug];

  const meta = content?.meta ?? {
    year: project.year,
    status: project.status,
    statusExtra: project.statusExtra,
  };

  /** Close modal → optionally pre-fill subject → smooth-scroll to #contact */
  const handleContactCta = (subject?: string) => {
    if (subject) {
      try {
        sessionStorage.setItem(CONTACT_SUBJECT_KEY, subject);
      } catch {
        /* ignored */
      }
      window.dispatchEvent(
        new CustomEvent('contact-prefill', { detail: { subject } }),
      );
    }
    onClose();
    requestAnimationFrame(() => {
      const target = document.querySelector('#contact');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  };

  // Group inline images by placement for easy lookup
  const imagesByPlacement = (content?.inlineImages ?? []).reduce<
    Record<InlineImagePlacement, InlineImage[]>
  >(
    (acc, img) => {
      (acc[img.placement] ||= []).push(img);
      return acc;
    },
    PLACEMENT_KEYS.reduce(
      (a, k) => ({ ...a, [k]: [] }),
      {} as Record<InlineImagePlacement, InlineImage[]>,
    ),
  );

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="work-modal-title"
      className="modal-backdrop fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto px-6 py-12 md:py-20"
      style={{
        background: 'rgba(10, 10, 10, 0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close case study"
        className="press fixed top-5 right-5 md:top-8 md:right-8 z-[1] w-10 h-10 rounded-full border border-bone/30 text-bone/85 hover:border-flash hover:text-flash transition-colors flex items-center justify-center text-[20px] leading-none font-mono"
      >
        ×
      </button>

      <article
        className="modal-content relative w-full max-w-[1000px] px-0 md:px-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — title + meta + (optional) serif italic tagline */}
        <header>
          <h2
            id="work-modal-title"
            className="font-hero font-black text-bone leading-[1] tracking-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            {project.title}
          </h2>
          <p className="mt-4 font-mono text-[11px] tracking-[0.18em] uppercase text-muted">
            {meta.year} ·{' '}
            {meta.statusDot ? (
              <span
                className="pulse-dot mr-2"
                aria-hidden
                style={{ verticalAlign: 'middle' }}
              />
            ) : null}
            {meta.status}
            {meta.statusExtra ? ` · ${meta.statusExtra}` : ''}
          </p>
          {content?.tagline ? (
            <p
              className="mt-6 font-serif italic text-bone/85 leading-[1.4] max-w-[720px]"
              style={{ fontSize: 'clamp(1.125rem, 2.2vw, 1.5rem)' }}
            >
              {content.tagline}
            </p>
          ) : null}
        </header>

        <hr className="border-0 border-t border-hairline my-8 md:my-12" />

        {!content ? (
          <p className="text-[18px] leading-[1.7] text-muted">
            Deep-dive content not yet wired up for this project.
          </p>
        ) : (
          <div className="space-y-8 md:space-y-12">
            {imagesByPlacement['after-header'].map((img, i) => (
              <InlineFigure key={`after-header-${i}`} image={img} title={project.title} />
            ))}

            <Section label="Problem">
              {content.problem.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Section>

            <Section label="Approach">
              <p>{content.approach.intro}</p>
              <ul className="mt-6 space-y-4">
                {content.approach.bullets.map((b, i) => (
                  <BulletItem key={i} text={b} />
                ))}
              </ul>
            </Section>

            {imagesByPlacement['after-approach'].map((img, i) => (
              <InlineFigure key={`after-approach-${i}`} image={img} title={project.title} />
            ))}

            <Section label="Stack rationale">
              {content.stackRationale.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Section>

            {imagesByPlacement['after-stack-rationale'].map((img, i) => (
              <InlineFigure key={`after-stack-${i}`} image={img} title={project.title} />
            ))}

            {content.architecture ? (
              <Section label="Architecture">
                <pre
                  className="font-mono text-[13px] md:text-[14px] leading-[1.7] whitespace-pre-wrap text-muted mt-2"
                  style={{
                    background: '#0F0F0F',
                    border: '1px solid #1F1F1F',
                    borderRadius: '6px',
                    padding: '24px',
                  }}
                >
                  {content.architecture}
                </pre>
              </Section>
            ) : null}

            <Section label="Current state">
              <p>{content.currentState}</p>
            </Section>
          </div>
        )}

        {/* Footer — primary + optional secondary CTA, OR inline waitlist form */}
        {content?.ctas ? (
          <>
            <hr className="border-0 border-t border-hairline my-8 md:my-12" />
            <Footer
              primary={content.ctas.primary}
              secondary={content.ctas.secondary}
              waitlistOpen={waitlistOpen}
              onOpenWaitlist={() => setWaitlistOpen(true)}
              onContact={handleContactCta}
            />
          </>
        ) : content?.cta ? (
          <>
            <hr className="border-0 border-t border-hairline my-8 md:my-12" />
            <footer>
              {content.cta.href ? (
                <a
                  href={content.cta.href}
                  target="_blank"
                  rel="noreferrer"
                  className="press inline-flex items-center gap-2 font-mono text-[13px] tracking-[0.06em] text-bone hover:text-flash transition-colors"
                >
                  <span>{content.cta.label}</span>
                  <span aria-hidden>↗</span>
                </a>
              ) : (
                <span className="font-mono text-[13px] tracking-[0.06em] text-muted">
                  {content.cta.label} →
                </span>
              )}
            </footer>
          </>
        ) : null}
      </article>
    </div>,
    document.body,
  );
}

/* ──────────────────────────────────────────────────────────────────────── */

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <p className="font-mono text-[11px] md:text-[14px] tracking-[0.18em] uppercase text-flash mb-4">
        {label}
      </p>
      <div className="text-[16px] md:text-[18px] leading-[1.7] text-muted space-y-4 max-w-[720px]">
        {children}
      </div>
    </section>
  );
}

function BulletItem({ text }: { text: string }) {
  const idx = text.indexOf(' — ');
  const head = idx >= 0 ? text.slice(0, idx) : text;
  const tail = idx >= 0 ? text.slice(idx) : '';

  return (
    <li className="flex gap-3 text-[16px] md:text-[18px] leading-[1.7] max-w-[720px]">
      <span aria-hidden className="font-mono text-flash mt-[3px] text-[14px] shrink-0">
        ›
      </span>
      <span>
        <span className="text-bone">{head}</span>
        {tail ? <span className="text-muted">{tail}</span> : null}
      </span>
    </li>
  );
}

/* ── Footer / CTAs ────────────────────────────────────────────────────── */

const PRIMARY_BTN_CLASS =
  'press inline-flex items-center gap-2 px-5 py-3 rounded-[6px] border border-flash text-flash font-mono text-[13px] tracking-[0.06em] uppercase transition-colors hover:bg-flash hover:text-ink focus-visible:bg-flash focus-visible:text-ink';

function Footer({
  primary,
  secondary,
  waitlistOpen,
  onOpenWaitlist,
  onContact,
}: {
  primary: CtaExternal | CtaContact | CtaWaitlist;
  secondary?: CtaContact;
  waitlistOpen: boolean;
  onOpenWaitlist: () => void;
  onContact: (subject?: string) => void;
}) {
  const isWaitlist = !('href' in primary) && primary.action === 'waitlist';

  // Persisted success — read localStorage synchronously so the success state
  // shows on first paint (no flash of the CTA button). Footer remounts on
  // every modal open, so the initializer always runs against fresh storage.
  const [alreadySubmitted] = useState<boolean>(() => {
    if (!isWaitlist || typeof window === 'undefined') return false;
    try {
      return window.localStorage.getItem(ALMI_WAITLIST_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Re-visit case: user already signed up — skip CTA + form, render success
  if (isWaitlist && alreadySubmitted) {
    return (
      <div className="fade-in-200">
        <WaitlistSuccess />
      </div>
    );
  }

  // CTA clicked but no prior submission — slide-down form
  if (isWaitlist && waitlistOpen) {
    return (
      <div className="slide-down">
        <WaitlistForm
          subject={(primary as CtaWaitlist).subject}
          source={(primary as CtaWaitlist).source}
        />
      </div>
    );
  }

  const centered = !secondary;

  return (
    <footer
      className={[
        'flex flex-wrap items-center gap-x-6 gap-y-4',
        centered ? 'justify-center' : '',
      ].join(' ')}
    >
      {/* Primary */}
      {'href' in primary ? (
        <a
          href={primary.href}
          target="_blank"
          rel="noreferrer"
          className={PRIMARY_BTN_CLASS}
        >
          <span>{primary.label}</span>
          <span aria-hidden>→</span>
        </a>
      ) : primary.action === 'contact' ? (
        <button
          type="button"
          onClick={() => onContact(primary.subject)}
          className={PRIMARY_BTN_CLASS}
        >
          <span>{primary.label}</span>
          <span aria-hidden>→</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={onOpenWaitlist}
          className={PRIMARY_BTN_CLASS}
        >
          <span>{primary.label}</span>
          <span aria-hidden>→</span>
        </button>
      )}

      {/* Secondary */}
      {secondary ? (
        <button
          type="button"
          onClick={() => onContact(secondary.subject)}
          className="press inline-flex items-center gap-2 font-mono text-[13px] tracking-[0.06em] uppercase text-muted hover:text-bone transition-colors"
        >
          <span className="border-b border-transparent hover:border-bone/60 pb-[1px]">
            {secondary.label}
          </span>
          <span aria-hidden>→</span>
        </button>
      ) : null}
    </footer>
  );
}

/* ── Waitlist form ────────────────────────────────────────────────────── */

type WaitlistStatus = 'idle' | 'submitting' | 'fading' | 'success' | 'error';

const ERROR_COPY =
  'Something went wrong. Please email hello@miguelborges.dev directly.';

function WaitlistForm({
  subject,
  source,
}: {
  subject?: string;
  source?: string;
}) {
  const [status, setStatus] = useState<WaitlistStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    // Client-side validation — HTML5 + minLength on company
    if (!form.checkValidity()) {
      const firstInvalid = form.querySelector<
        HTMLInputElement | HTMLSelectElement
      >(':invalid');
      firstInvalid?.focus();
      setError(ERROR_COPY);
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setError(null);

    const formData = new FormData(form);
    const teamSize = (formData.get('team_size') as string) || 'not specified';

    const payload = {
      email: formData.get('email'),
      company: formData.get('company'),
      team_size: teamSize,
      _subject: subject ?? 'Almi waitlist signup',
      source: source ?? 'almi-modal-waitlist',
    };

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        try {
          window.localStorage.setItem(ALMI_WAITLIST_KEY, 'true');
        } catch {
          /* localStorage may be disabled — submission still succeeded */
        }
        // 200ms fade-out, then mount success state (which has its own fade-in)
        setStatus('fading');
        setTimeout(() => setStatus('success'), 200);
      } else {
        setError(ERROR_COPY);
        setStatus('error');
      }
    } catch {
      setError(ERROR_COPY);
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="fade-in-200">
        <WaitlistSuccess />
      </div>
    );
  }

  const isSubmitting = status === 'submitting';
  const isFading = status === 'fading';

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-label="Waitlist signup"
      className={[
        'mx-auto max-w-[500px] w-full transition-opacity duration-200',
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100',
      ].join(' ')}
    >
      <div className="space-y-1">
        <WaitlistField
          name="email"
          type="email"
          label="Email"
          required
          autoComplete="email"
          placeholder="your@email.com"
        />
        <WaitlistField
          name="company"
          type="text"
          label="Company"
          required
          minLength={2}
          autoComplete="organization"
          placeholder="Your company"
        />
        <label className="block py-2">
          <span className="block font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted-soft mb-1">
            Team size (optional)
          </span>
          <select
            name="team_size"
            defaultValue=""
            className="field"
            style={{
              appearance: 'none',
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              backgroundImage:
                'linear-gradient(45deg, transparent 50%, #7A7670 50%), linear-gradient(135deg, #7A7670 50%, transparent 50%)',
              backgroundPosition:
                'calc(100% - 14px) calc(50% + 2px), calc(100% - 9px) calc(50% + 2px)',
              backgroundSize: '5px 5px, 5px 5px',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <option value="">—</option>
            <option value="1-15">1–15</option>
            <option value="16-50">16–50</option>
            <option value="51+">51+</option>
          </select>
        </label>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className={`${PRIMARY_BTN_CLASS} disabled:opacity-60 disabled:cursor-not-allowed`}
        >
          <span>{isSubmitting ? 'Sending' : 'Join waitlist'}</span>
          {isSubmitting ? (
            <span aria-hidden className="spinner" />
          ) : (
            <span aria-hidden>→</span>
          )}
        </button>
      </div>

      {/* Error — below form, mono 14px, #F87171 (per brief) */}
      <div className="min-h-[24px] mt-4" aria-live="polite" role="status">
        {error ? (
          <p
            className="font-mono text-[14px] leading-[1.5]"
            style={{ color: '#F87171' }}
          >
            {error}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function WaitlistField({
  name,
  label,
  type = 'text',
  required,
  placeholder,
  autoComplete,
  minLength,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  minLength?: number;
}) {
  return (
    <label className="block py-2">
      <span className="block font-mono text-[10.5px] tracking-[0.18em] uppercase text-muted-soft mb-1">
        {label}
        {required ? ' *' : ''}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        minLength={minLength}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-required={required ? 'true' : undefined}
        className="field"
      />
    </label>
  );
}

/** Success state shown after a successful waitlist submission AND on
 *  subsequent modal opens (via localStorage). */
function WaitlistSuccess() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mx-auto max-w-[500px] text-center"
    >
      <svg
        aria-hidden
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="mx-auto mb-4"
      >
        <path
          d="M5 12.5L9.5 17L19 7"
          stroke="#4ADE80"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="font-mono text-[18px] tracking-[0.18em] uppercase text-flash mb-3">
        You&apos;re on the list.
      </p>
      <p className="text-[16px] leading-[1.6] text-muted">
        We&apos;ll reach out when Almi opens.
      </p>
    </div>
  );
}

/* ── Inline figures ───────────────────────────────────────────────────── */

function InlineFigure({
  image,
  title,
}: {
  image: InlineImage;
  title: string;
}) {
  return (
    <figure className="mx-auto" style={image.maxWidth ? { maxWidth: image.maxWidth } : undefined}>
      {image.frame === 'mac' ? (
        <MacFrame
          src={image.src}
          alt={image.caption ?? `${title} — web screenshot`}
          accent={image.accent}
        />
      ) : (
        <IPhoneFrame src={image.src} alt={image.caption ?? `${title} — mobile screenshot`} />
      )}
      {image.caption ? (
        <figcaption className="mt-4 font-mono text-[11px] tracking-[0.18em] uppercase text-muted text-center">
          {image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Image with graceful fallback. The frame grows to the image's natural
 *  aspect — never crops. When the file is missing we render a placeholder
 *  with `fallbackAspect` so the layout doesn't collapse. */
function FramedImage({
  src,
  alt,
  className,
  style,
  fallbackAspect,
}: {
  src: string;
  alt: string;
  className: string;
  style?: React.CSSProperties;
  /** CSS aspect-ratio value applied to the placeholder, e.g. "16 / 10" */
  fallbackAspect: string;
}) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-ink-elev text-muted-soft font-mono text-[10.5px] tracking-[0.18em] uppercase`}
        style={{ aspectRatio: fallbackAspect, ...style }}
      >
        <span>Screenshot pending</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className={className}
      style={style}
    />
  );
}

function MacFrame({
  src,
  alt,
  accent,
}: {
  src: string;
  alt: string;
  accent?: 'flash';
}) {
  const isAccent = accent === 'flash';

  return (
    <div
      className="relative w-full overflow-hidden rounded-[8px] bg-[#1a1a1a]"
      style={{
        // Flash accent uses a subtle green border + inset glow; default uses
        // a neutral dark hairline. Both keep the same black drop-shadow.
        border: isAccent
          ? '1px solid rgba(74, 222, 128, 0.15)'
          : '1px solid #2a2a2a',
        boxShadow: isAccent
          ? 'inset 0 0 30px rgba(74, 222, 128, 0.08)'
          : undefined,
        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.35))',
      }}
    >
      {/* Top bar flows in document — defines its own height; image flows below
          at its natural aspect. Nothing is cropped. */}
      <div className="h-9 bg-[#222] border-b border-[#2a2a2a] flex items-center px-4 gap-[6px]">
        <span aria-hidden className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span aria-hidden className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span aria-hidden className="w-3 h-3 rounded-full bg-[#28c840]" />
      </div>
      <FramedImage
        src={src}
        alt={alt}
        className="block w-full h-auto"
        fallbackAspect="16 / 10"
      />
    </div>
  );
}

function IPhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mx-auto" style={{ maxWidth: '300px' }}>
      <div
        className="relative bg-black overflow-hidden"
        style={{
          border: '4px solid #000',
          borderRadius: '32px',
          filter:
            'drop-shadow(0 0 28px rgba(74, 222, 128, 0.22)) drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
        }}
      >
        {/* Notch — absolute over the image, doesn't drive layout */}
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 bg-black z-10"
          style={{
            width: '38%',
            height: '22px',
            borderBottomLeftRadius: '14px',
            borderBottomRightRadius: '14px',
          }}
        />
        {/* Image flows naturally; frame grows to its aspect — never cropped */}
        <FramedImage
          src={src}
          alt={alt}
          className="block w-full h-auto"
          style={{ borderRadius: '24px' }}
          fallbackAspect="9 / 19.5"
        />
      </div>
    </div>
  );
}
