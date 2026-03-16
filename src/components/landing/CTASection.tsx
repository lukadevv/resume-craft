'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/Reveal';

export function CTASection() {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#16A085] to-[#3ECF8E] px-6 py-16 md:px-12 md:py-24">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-50" />

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Ready to Build Your Dream Resume?
            </h2>
            <p className="mt-4 text-lg text-white/80 md:text-xl">
              Join thousands of job seekers who have successfully landed their dream jobs with
              professionally crafted resumes.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-center">
              <Link href="/create">
                <Button
                  size="lg"
                  className="bg-white text-[#0b1220] hover:bg-white/90 gap-2 text-base"
                >
                  Create Resume Now
                </Button>
              </Link>
              <Link href="/#templates">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white text-base"
                >
                  Browse Templates
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/60">
              No account required • Free to start • Export anytime
            </p>
          </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
