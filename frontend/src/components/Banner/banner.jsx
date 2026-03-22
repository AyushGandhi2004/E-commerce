import React from "react";

const Banner = () => {
    return (
        <section className="w-full bg-[var(--color-bg-primary)] border-b border-[var(--color-primary-light)]/30">
            <div className="page-shell py-14 md:py-20">
                <div className="relative overflow-hidden rounded-3xl border border-[var(--color-primary-light)]/50 px-6 md:px-10 py-12 md:py-16 text-center bg-gradient-to-br from-[var(--color-primary-soft)] via-white to-[var(--color-primary-light)]/75 shadow-lg">
                    <div className="absolute -top-14 -left-12 h-44 w-44 rounded-full bg-[var(--color-primary-light)]/55 blur-3xl" />
                    <div className="absolute -bottom-20 -right-8 h-52 w-52 rounded-full bg-[var(--color-primary-dark)]/25 blur-3xl" />

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <span className="inline-flex items-center rounded-full border border-[var(--color-primary-light)]/70 bg-white/70 px-4 py-1.5 text-xs md:text-sm font-semibold text-[var(--color-primary-deep)] mb-5">
                            Curated picks for every lifestyle
                        </span>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text-primary)] mb-4 leading-tight">
                            Discover Your <span className="heading-gradient">Style</span>
                        </h1>
                        <p className="text-sm md:text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8 leading-relaxed">
                            Explore thoughtfully curated products with premium quality, elegant design and prices that fit your everyday life.
                        </p>
                    </div>

                    <div className="relative z-10 grid grid-cols-3 gap-2 md:gap-4 mt-10 max-w-lg mx-auto">
                        <div className="rounded-xl bg-white/70 border border-[var(--color-primary-light)]/50 py-3">
                            <p className="text-xl md:text-2xl font-bold text-[var(--color-primary-deep)]">2k+</p>
                            <p className="text-xs md:text-sm text-[var(--color-text-secondary)]">Products</p>
                        </div>
                        <div className="rounded-xl bg-white/70 border border-[var(--color-primary-light)]/50 py-3">
                            <p className="text-xl md:text-2xl font-bold text-[var(--color-primary-deep)]">24h</p>
                            <p className="text-xs md:text-sm text-[var(--color-text-secondary)]">Support</p>
                        </div>
                        <div className="rounded-xl bg-white/70 border border-[var(--color-primary-light)]/50 py-3">
                            <p className="text-xl md:text-2xl font-bold text-[var(--color-primary-deep)]">4.8★</p>
                            <p className="text-xs md:text-sm text-[var(--color-text-secondary)]">Rated</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;