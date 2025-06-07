import ClarityAssistUI from '@/components/clarity-assist/ClarityAssistUI';

export default function Home() {
  return (
    <main className="flex flex-col items-center p-4 sm:p-6 md:p-8 min-h-screen bg-background text-foreground">
      <div className="w-full max-w-lg mx-auto bg-card p-4 sm:p-6 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-headline font-bold mb-6 text-center text-primary">
          ClarityAssist
        </h1>
        <ClarityAssistUI />
      </div>
    </main>
  );
}
