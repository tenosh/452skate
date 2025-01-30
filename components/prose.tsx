import clsx from 'clsx';

const Prose = ({ html, className }: { html: string; className?: string }) => {
  return (
    <div
      className={clsx(
        'prose text-base leading-7 text-452-blue-light prose-headings:mt-8 prose-headings:font-semibold prose-headings:tracking-wide prose-headings:text-452-blue-dark prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-a:text-452-blue-dark prose-a:underline hover:prose-a:text-452-blue-light prose-strong:text-452-blue-dark prose-ol:mt-8 prose-ol:list-decimal prose-ol:pl-6 prose-ul:mt-8 prose-ul:list-disc prose-ul:pl-6 md:text-xl',
        className
      )}
      dangerouslySetInnerHTML={{ __html: html as string }}
    />
  );
};

export default Prose;
