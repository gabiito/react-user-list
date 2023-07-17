import { useState, useEffect, useRef, useMemo } from "react";
import "./App.css";
import { SortBy, User } from "@/types";
import { Container, Filters, Footer, UsersList } from "@/components";

function App() {
  const [userData, setUserData] = useState<User[]>([]);
  const [tableColored, setTableColored] = useState<boolean>(false);
  const [sorting, setSorting] = useState<string>(SortBy.NONE);
  const [countryFilter, setCountryFilter] = useState<string | null>(null);
  const originalData = useRef<User[]>([]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=50")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw response;
      })
      .then((data) => {
        setUserData(data.results);
        originalData.current = data.results;
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const toggleTableColor = () => {
    setTableColored(!tableColored);
  };

  const toggleCountrySort = () => {
    setSorting(sorting === SortBy.COUNTRY ? SortBy.NONE : SortBy.COUNTRY);
  };

  const handleDelete = (uuid: string) => {
    setUserData((prev) => prev.filter((user) => user.login.uuid !== uuid));
  };

  const handleReset = () => {
    setUserData(originalData.current);
    setSorting(SortBy.NONE);
  };

  const filteredUsers = useMemo(() => {
    return countryFilter
      ? userData.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(countryFilter.toLowerCase());
        })
      : userData;
  }, [userData, countryFilter]);

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) {
      return filteredUsers;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const compareProperty: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: (user) => user.location.country,
      [SortBy.NAME]: (user) => user.name.first,
      [SortBy.LAST]: (user) => user.name.last,
    };

    return [...filteredUsers].sort((a, b) => {
      const aValue = compareProperty[sorting](a);
      const bValue = compareProperty[sorting](b);

      return aValue.localeCompare(bValue);
    });
  }, [filteredUsers, sorting]);

  return (
    <>
    <Container className="">
      <header>
        <h1 className="text-center text-4xl font-bold my-10">Users List</h1>
        <Filters
          onReset={handleReset}
          onToggleColor={toggleTableColor}
          onToggleCountrySort={toggleCountrySort}
          onFilter={(value) => setCountryFilter(value)}
        />
      </header>
      <main className="">
        <div className="h-full">
          <UsersList
            users={sortedUsers}
            tableColored={tableColored}
            changeSorting={setSorting}
            onDeleteUser={handleDelete}
          />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </Container>
    </>
  );
}

export default App;
