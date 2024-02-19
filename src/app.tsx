import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";
import { ChangeEvent, useState } from "react";
import { NotebookPen, Github, Linkedin, Instagram } from "lucide-react"

interface Note {
    id: string;
    date: Date;
    content: string;
}

export function App() {
    const [search, setSearch] = useState('');

    const [notes, setNotes] = useState<Note[]>(() => {
        const notesOnStorage = localStorage.getItem('notes');
        
        if (notesOnStorage) {
            return JSON.parse(notesOnStorage);
        }

        return []
    })
    
    const filteredNotes = search !== '' ? notes.filter(note => note.content.toLowerCase().includes(search.toLocaleLowerCase())) : notes;
    
    function onNoteCreated(content: string) {
        const newNote ={
            id: crypto.randomUUID(),
            date: new Date(),
            content,
        }

        const notesArray = [newNote, ...notes];
        setNotes(notesArray);
        localStorage.setItem('notes', JSON.stringify(notesArray));
    }

    function onNoteDeleted(id: string) {
        const notesArray = notes.filter(notes => {
            return notes.id !== id;
        })

        setNotes(notesArray);
        localStorage.setItem('notes', JSON.stringify(notesArray));
    }

    function handleSearch(event: ChangeEvent<HTMLInputElement>) {
        const query = event.target.value;

        setSearch(query);
    }
    

    return (
        <div className="flex flex-col justify-between items-center min-h-screen">
            <div className="mx-auto max-w-6xl mt-12 mb-6 space-y-6 px-5">
                
                <header className="flex flex-row items-center gap-2">
                    < NotebookPen className="text-pink-600"/>
                    <h1 className="text-2xl text-pink-600 w-fit font-bold">ANote</h1>
                </header>
                
                <form className="w-full">
                    <input
                        type="text"
                        placeholder="Busque em suas notas..."
                        className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-pink-600"
                        onChange={handleSearch}
                    />
                </form>

                <div className="h-px bg-purple-700" />

                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 auto-rows-[250px]">
                    <NewNoteCard onNoteCreated={onNoteCreated} />

                    {filteredNotes.map(note => {
                        return <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />
                    })}
                </div> 
            </div>

            <footer className="relative bottom-0 my-3">
                <p className="text-pink-600 text-xl mb-2 text-center font-semibold">By: Juliano Aleixo</p>
                <div className="flex flex-row">
                    <a href="https://github.com/JulianoAleixo" target="_blank">
                        <Github className="size-12 mx-2 p-2 text-white bg-pink-700 rounded-lg hover:bg-purple-600 transition-all duration-300 ease-in-out"/>
                    </a>
                    <a href="https://linkedin.com/in/dev-juliano-aleixo" target="_blank">
                        <Linkedin className="size-12  mx-2 p-2 text-white bg-pink-700 rounded-lg hover:bg-purple-600 transition-all duration-300 ease-in-out"/>
                    </a>
                    <a href="https://www.instagram.com/julianuh.aleixo/?utm_medium=copy_link" target="_blank">
                        <Instagram className="size-12 mx-2 p-2 text-white bg-pink-700 rounded-lg hover:bg-purple-600 transition-all duration-300 ease-in-out" />
                    </a>
                </div>
            </footer>
        </div>
    );
}
