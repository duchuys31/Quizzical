import React, { useState, useEffect, useMemo } from "react"

const unselected = {
  marginLeft: "20px",
  height: "30px",
  borderRadius: '35px',
  color: '#293264',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: "10px",
  border: "1.5px solid #293264",
}

const selected = {
  marginLeft: "20px",
  height: "30px",
  borderRadius: '35px',
  color: '#293264',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: "10px",
  background: "#D6DBF5"
}

const trueAnswer = {
  marginLeft: "20px",
  height: "30px",
  borderRadius: '35px',
  color: '#293264',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: "10px",
  background: "#94D7A2"
}

const falseAnswer = {
  marginLeft: "20px",
  height: "30px",
  borderRadius: '35px',
  color: '#293264',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: "10px",
  background: "#F8BCBC"
}

const noAnswer = {
  marginLeft: "20px",
  height: "30px",
  borderRadius: '35px',
  color: '#293264',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: "10px",
  border: "0.771px solid #4D5B9E",
}

const StartPage = ( props ) =>
{
  return (
    <div style={ {
      backgroundImage: `url(https://i.imgur.com/7GnV6tM.jpg)`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: "1000px",
      height: "1000px"
    } }>
      <h1 style={ {
        fontWeight: 500, lineHeight: '1.2', fontSize: '70px', color: '#293264'
      } }>Quizzical</h1>
      <h1 style={ {
        fontWeight: 400, lineHeight: '1.2', fontSize: '35px', color: '#293264'
      } } >
        Some description if needed
      </h1>
      <button className="btn" style={ {
        height: '100px',
        width: '400px',
        marginTop: '50px',
        background: '#4D5B9E',
        borderRadius: '35px'
      } } onClick={ () => props.setStart( false ) }>
        <h1 style={ {
          fontWeight: 450, lineHeight: '1.2', fontSize: '30px', color: 'white'
        } } >
          Start quiz
        </h1>
      </button>
    </div>
  )
}

const QuizzPage = ( props ) =>
{
  const [ answers, setAnswers ] = useState( new Map() )
  const [ options, setOptions ] = useState( [ [], [], [], [], [] ] )
  const [ check, setCheck ] = useState( false )
  const [ score, setScore ] = useState( 0 )

  useEffect(
    () =>
    {
      const data = []
      for ( let i = 0; i < 5; i++ )
      {
        if ( props.questions )
          data.push( create( props.questions[ i ].correct_answer, props.questions[ i ].incorrect_answers ) )
      }
      setOptions( data )
      setAnswers( [] )

    }, [ props.questions ]
  )
  const create = ( correct_answer, incorrect_answers ) =>
  {
    let ansList = [ correct_answer, ...incorrect_answers ];

    for ( let i = ansList.length - 1; i > 0; i-- )
    {
      const j = Math.floor( Math.random() * ( i + 1 ) );
      [ ansList[ i ], ansList[ j ] ] = [ ansList[ j ], ansList[ i ] ];
    }

    return ansList;
  };

  useEffect( () =>
  {
    calculateScore();
  }, [ answers ] );

  const calculateScore = () =>
  {
    let newScore = 0;
    for ( let i = 0; i < 5; i++ )
    {
      if ( answers[ i ] === props.questions[ i ].correct_answer )
      {
        newScore++;
      }
    }
    setScore( newScore );
  };

  return (
    <div style={ {
      backgroundImage: `url(https://i.imgur.com/7GnV6tM.jpg)`,
      width: "1000px",
      height: "1000px"
    } }>
      <br />
      <br />
      <br />
      <div className="container" style={ { textAlign: 'left', marginLeft: "70px", width: "800px" } }>
        {
          props.questions.map(
            ( question, index ) =>
            {
              return (
                <>
                  <h1 style={ {
                    fontWeight: 600,
                    lineHeight: '1.2',
                    fontSize: '20px',
                    color: '#293264',
                    margin: '20px 0'
                  } } >
                    <span dangerouslySetInnerHTML={ { __html: question.question } } />
                  </h1 >
                  <div className="row">
                    {
                      options[ index ].map(
                        option =>
                        {
                          return (
                            <button type="button" class="btn" style={
                              check ?
                                (
                                  option === question.correct_answer ? trueAnswer :
                                    (
                                      option === answers[ index ] && answers[ index ] !== question.correct_answer ? falseAnswer : noAnswer
                                    )

                                ) : (
                                  option === answers[ index ] ? selected : unselected
                                )
                            } onClick={ () => setAnswers( { ...answers, [ index ]: option } ) } disabled={ check }>
                              <div style={ {
                                marginLeft: "10px",
                                marginRight: "10px"
                              } }>
                                <span dangerouslySetInnerHTML={ { __html: option } } />
                              </div>
                            </button>
                          )
                        }
                      )
                    }
                  </div>
                  <div style={ { width: '100%', height: '1px', background: '#DBDEF0', marginBottom: "20px", marginTop: "20px" } }></div>

                </>

              )
            }
          )
        }
      </div>
      {
        check ? (
          <div className="row" style={ {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: "50px"
          } }>
            <h1 style={ {
              fontWeight: 600,
              lineHeight: '1.2',
              fontSize: '25px',
              color: '#293264',
              marginRight: '20px'
            } }>
              You scored { score }/5 correct answers
            </h1>
            <button className="btn" style={ {
              height: '60px',
              width: '200px',
              marginTop: '10px', // Thay đổi khoảng cách giữa hai phần tử
              background: '#4D5B9E',
              borderRadius: '20px',
              color: 'white',
              fontWeight: 450,
              fontSize: '20px',
            } } onClick={ () =>
            {
              window.location.href = "/"
            }
            }>
              Play again
            </button>
          </div>
        ) : (
          <button className="btn" style={ {
            height: '70px',
            width: '250px',
            marginTop: '30px',
            background: '#4D5B9E',
            borderRadius: '20px',
          } } onClick={ () =>
          {
            setCheck( true )
          } }>
            <h1 style={ {
              fontWeight: 450, lineHeight: '1.2', fontSize: '20px', color: 'white', display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            } } >
              Check answers
            </h1>
          </button>
        )
      }

    </div >
  )
}

const App = () =>
{
  const [ start, setStart ] = useState( true )
  const [ questions, setQuestions ] = useState( [] )

  useEffect(
    () =>
    {
      fetch( 'https://opentdb.com/api.php?amount=5&type=multiple' )
        .then( resp => resp.json() )
        .then( data => setQuestions( data.results ) )
    }, []
  )
  useEffect(
    () =>
    {
      console.log( questions )
    }, [ questions ]
  )

  return (

    <>
      <center>
        {
          start ? (
            <StartPage
              setStart={ setStart }
            />
          ) : (
            <>
              {
                questions.length > 0 && <QuizzPage
                  questions={ questions }
                />
              }
            </>

          )
        }
      </center >

    </>
  );
}

export default App;
