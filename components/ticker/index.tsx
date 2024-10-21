export default function Ticker({ text = 'This is a ticker component' }: { text?: string }) {
  const repeatedText = `${text} - `.repeat(5).trim();

  return (
    <div className="bg-primary relative w-full overflow-hidden bg-f-orange py-2 text-f-green-light">
      <div className="ticker-content">
        <span className="ticker-item text-primary-foreground px-4">{repeatedText}</span>
        <span className="ticker-item text-primary-foreground px-4">{repeatedText}</span>
      </div>
    </div>
  );
}
