
import React, { useContext } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { SearchInputContext } from '../../context/SearchInput';
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
    const {input,setInput} = useContext(SearchInputContext);
    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(input){
            navigate(`/search/${input}`);
        }
    }
    

    return (
        <section className="section-gap-tight bg-[var(--color-bg-primary)]">
            <div className="page-shell">
                <form className="relative w-full max-w-5xl mx-auto" onSubmit={handleSubmit}>
                    <div className="absolute inset-0 -z-10 blur-2xl bg-[var(--color-primary-soft)]/60" />
                    <div className="absolute -top-1 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[var(--color-primary-light)]/90 to-transparent" />
                    <div className="absolute -bottom-1 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[var(--color-primary-light)]/90 to-transparent" />
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--color-text-light)]" />
                        <input
                            type="text"
                            value={input}
                            onChange={(e)=>setInput(e.target.value)}
                            placeholder="Search products, brands and categories..."
                            className="w-full h-12 md:h-14 pl-12 md:pl-14 pr-28 md:pr-32 text-[var(--color-text-primary)] bg-white/92 border border-[var(--color-primary-light)]/55 rounded-xl md:rounded-2xl focus:outline-none focus:border-[var(--color-primary-dark)] focus:ring-4 focus:ring-[var(--focus-ring)] transition-all placeholder-[var(--color-text-light)] shadow-md"
                        />
                        <button className="absolute top-1/2 right-2 -translate-y-1/2 px-4 md:px-5 py-2 rounded-lg md:rounded-xl bg-[var(--color-primary-soft)] border border-[var(--color-primary-light)]/80 text-[var(--color-primary-deep)] font-semibold hover:bg-[var(--color-primary-light)]/70 transition-all">
                            Search
                        </button>
                    </div>
                    <p className="text-xs md:text-sm text-[var(--color-text-light)] mt-3 pl-1 text-center md:text-left">
                        Try terms like “wireless earphones”, “kitchen organizer”, or “running shoes”
                    </p>
                </form>
            </div>
        </section>
    );
};

export default SearchBar;