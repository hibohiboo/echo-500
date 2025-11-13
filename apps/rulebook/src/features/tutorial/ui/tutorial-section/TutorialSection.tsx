import type { JSX } from 'solid-js';

interface TutorialSectionProps {
  children: JSX.Element;
  showContinueButton?: boolean;
  onContinue?: () => void;
  continueButtonText?: string;
}

export function TutorialSection(props: TutorialSectionProps) {
  return (
    <div class="tutorial-section">
      <div class="tutorial-section__content">{props.children}</div>

      {props.showContinueButton && (
        <div class="tutorial-section__footer">
          <button
            class="tutorial-section__continue-btn"
            onClick={props.onContinue}
          >
            <span class="btn-text">
              {props.continueButtonText || '先を読む'}
            </span>
            <span class="btn-icon">▶</span>
          </button>
        </div>
      )}

      <style>{`
 
        .tutorial-section {
          background: rgba(26, 26, 26, 0.6);
          border-left: 4px solid var(--color-nature-accent);
          border-radius: 8px;
          padding: var(--spacing-xl);
          margin-bottom: var(--spacing-xl);
          backdrop-filter: blur(10px);
          animation: slideIn 0.5s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* デフォルトで全てのボタンを非表示（DOM上には存在） */
        .tutorial-section .tutorial-section__footer {
          visibility: hidden;
          height: 0;
          overflow: hidden;
        }

        /* showContinueButtonがtrueの要素のうち、最後の要素のボタンのみ表示 */
        .tutorial-section:has(.tutorial-section__footer):last-of-type .tutorial-section__footer {
          visibility: visible;
          height: auto;
        }

       @scope {
          .tutorial-section__content {
            color: var(--text-secondary);
            font-size: 1rem;
            line-height: 1.8;
          }

          .tutorial-section__content h2 {
            font-size: 1.5rem;
            color: var(--color-cyber-primary);
            margin-bottom: var(--spacing-md);
            text-shadow: 0 0 8px rgba(0, 255, 204, 0.5);
          }

          .tutorial-section__content p {
            margin-bottom: var(--spacing-md);
          }

          .tutorial-section__content strong {
            color: var(--color-nature-accent);
          }

          .tutorial-section__content code {
            background: rgba(0, 255, 204, 0.1);
            padding: 0.2em 0.4em;
            border-radius: 4px;
            font-family: var(--font-primary);
            color: var(--color-cyber-secondary);
          }

          .tutorial-section__footer {
            margin-top: var(--spacing-xl);
            display: flex;
            justify-content: center;
          }



          .tutorial-section__continue-btn {
            font-family: var(--font-heading);
            font-size: 1rem;
            padding: var(--spacing-md) var(--spacing-xl);
            background: transparent;
            border: 2px solid var(--color-cyber-primary);
            color: var(--color-cyber-primary);
            border-radius: 4px;
            cursor: pointer;
            transition: all var(--transition-normal);
            display: flex;
            align-items: center;
            gap: var(--spacing-md);
            position: relative;
            overflow: hidden;
          }

          .tutorial-section__continue-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: var(--color-cyber-primary);
            transition: left var(--transition-normal);
            z-index: -1;
            opacity: 0.2;
          }

          .tutorial-section__continue-btn:hover::before {
            left: 0;
          }

          .tutorial-section__continue-btn:hover {
            box-shadow: 0 0 20px var(--color-cyber-glow);
            transform: translateY(-2px);
          }

          .tutorial-section__continue-btn:active {
            transform: translateY(0);
          }

          .btn-text {
            letter-spacing: 0.05em;
          }

          .btn-icon {
            font-size: 0.8rem;
            transition: transform var(--transition-fast);
          }

          .tutorial-section__continue-btn:hover .btn-icon {
            transform: translateX(4px);
          }
        }
      `}</style>
    </div>
  );
}
