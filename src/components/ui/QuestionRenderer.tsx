import clsx from 'clsx';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import type { QuestionItem } from '../../data/questions';

export interface QuestionRendererProps {
  question: QuestionItem;
  index: number;
  total: number;
  answer?: string;
  onAnswer: (key: string) => void;
  showResult?: boolean;
  bookmarked?: boolean;
  onBookmark?: () => void;
}

export default function QuestionRenderer({
  question, index, total, answer, onAnswer, showResult = false, bookmarked, onBookmark,
}: QuestionRendererProps) {
  return (
    <div className="card p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">Вопрос {index + 1} из {total}</div>
          <h3 className="mt-2 text-lg font-semibold text-ink leading-snug whitespace-pre-line">{question.promptRu}</h3>
        </div>
        {onBookmark && (
          <button
            onClick={onBookmark}
            className="rounded-lg p-2 text-ink-muted hover:text-ink hover:bg-surface-soft"
            aria-label={bookmarked ? 'Убрать из закладок' : 'В закладки'}
          >
            {bookmarked ? <BookmarkCheck className="h-4 w-4 text-amber-500" /> : <Bookmark className="h-4 w-4" />}
          </button>
        )}
      </div>

      <div className="mt-6 grid gap-2.5">
        {question.choices.map((c) => {
          const selected = answer === c.key;
          const isCorrect = c.key === question.correctKey;
          const showRight = showResult && isCorrect;
          const showWrong = showResult && selected && !isCorrect;
          return (
            <button
              key={c.key}
              onClick={() => !showResult && onAnswer(c.key)}
              disabled={showResult}
              className={clsx(
                'text-left rounded-xl border px-4 py-3 transition-colors flex items-start gap-3',
                showRight && 'border-emerald-300 bg-emerald-50/70',
                showWrong && 'border-rose-300 bg-rose-50/70',
                !showRight && !showWrong && selected && 'border-navy-700 bg-navy-50',
                !showRight && !showWrong && !selected && 'border-navy-100 bg-white hover:border-navy-300',
              )}
            >
              <span className={clsx(
                'mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg text-xs font-bold',
                showRight ? 'bg-emerald-500 text-white' :
                showWrong ? 'bg-rose-500 text-white' :
                selected ? 'bg-navy-800 text-white' : 'bg-navy-50 text-navy-800'
              )}>
                {c.key}
              </span>
              <span className="text-sm text-ink leading-relaxed">{c.text}</span>
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className="mt-5 rounded-xl border border-navy-100 bg-surface-alt p-4 text-sm text-ink">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-subtle">Объяснение</div>
          <p className="mt-1.5">{question.explanationRu}</p>
        </div>
      )}
    </div>
  );
}
