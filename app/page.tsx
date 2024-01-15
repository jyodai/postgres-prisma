import EntryList from '@/app/components/EntryList';
import { getCategory } from '@/api/category'
import { getEntry } from '@/api/entry'


export default async function Home() {
    const [categories, entries] = await Promise.all([getCategory(), getEntry()]);

    return (
      <EntryList entries={entries} categories={categories} />
    );
}

