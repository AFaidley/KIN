import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route 
            path='/' 
            element={<Homepage />} 
          />
          <Route 
            path='' 
            element={<Addiction />} 
          />
          <Route 
            path='' 
            element={<Chronic />} 
          />
          <Route 
            path=''
            element={<Grief />}
          />
          <Route 
            path=''
            element={<Mental />}
          />
          <Route 
            path=''
            element={<Physical />}
          />
          <Route 
            path=''
            element={<PTSD />}
          />
          <Route 
            path=''
            element={<Userpage />}
          />
        </Routes>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
