// Davie Strus video help
// https://cdn.pixabay.com/photo/2014/04/03/11/50/paw-312322_640.png visitor image
// https://freepngimg.com/thumb/bear/89757-giant-head-bear-pandas-baby-logo-panda-thumb.png home image
// https://pixabay.com/vectors/angry-animal-forrest-fox-fuchs-1294363/ fox image
// https://seeklogo.com/vector-logo/252641/buldog bulldog logo


function Team (props) {
    let percentageDiv

    if (props.stats.shots) {
        let percentage = ((props.stats.goals / props.stats.shots) * 100).toFixed(2)
        percentageDiv = (
            <div className="percentage">Percetage: {percentage}%</div>
        )
    }
    

    return (
        <div className="teams">
            <h2>{props.teamName}</h2>

            <div className="logo">
                <img src={props.logo} alt={props.teamName} />
            </div>
            <div className="results">
                <div className="shot">Shots: {props.stats.shots}</div>
                <div className="goals">Goals: {props.stats.goals}</div>
                {percentageDiv}
            </div>

            <button onClick={props.shotsHandler}>Shoot!!!</button>
        </div>
    )
}

function ScoreBoard(props) {
    
    return (
        <div className="scoreBoard">
            <button className="sButton">S c o r e B o a r d</button>
            <div className="scoresWrap">
                <div className="teamStats">
                    <h3>Visitors</h3>
                    <div className="teamScore">{props.visitingTeamStats.goals}</div>
                </div>
                <div className="teamStats">
                    <h3>Home</h3>
                    <div className="teamScore">{props.homeTeamStats.goals}</div>
                </div>
            </div>
        </div>
    )
}

class Game extends React.Component {

    constructor (props) {
        super(props)

        this.state = {
            resetCount: 0,
            homeTeamStats: {
                shots: 0,
                goals: 0
            },
            visitingTeamStats: {
                shots: 0,
                goals: 0
            }
        }

        this.kickSound = new Audio('./sounds/soccer-kick.wav')
        this.scoreSound = new Audio('./sounds/cheers.wav')
    }

    shotsOnGoal = (team) => {

        let teamStatsKey = `${team}TeamStats`

        let goals = this.state[teamStatsKey].goals

        this.kickSound.play()

        if (Math.random() >= 0.5) {

            goals += 1

            setTimeout(() => {
                this.scoreSound.play()
            }, 500)
            
        }

        this.setState((state, props) => ({
            [teamStatsKey] : {
                shots: state[teamStatsKey].shots + 1,
                goals
            }
         }))
    }

    resetGame = () => {
        this.setState((state,props) => ({
            resetCount: state.resetCount + 1,
            homeTeamStats: {
                shots: 0,
                goals: 0
            },
            visitingTeamStats: {
                shots: 0,
                goals: 0
            }

        }))
    }

    render() {
        return  (
            <div className="Games">
                <ScoreBoard
                    visitingTeamStats={this.state.visitingTeamStats}
                    homeTeamStats={this.state.homeTeamStats}
                />
                <h1>Welcome to {this.props.venue}</h1>
                <div className="gameContainer">
                    <Team 
                        teamName={this.props.homeTeam.name} 
                        logo={this.props.homeTeam.logoSrc}
                        stats={this.state.homeTeamStats}
                        shotsHandler={() => this.shotsOnGoal('home')}
                    />
                    <div className="spacer">
                        <div className="vs">VS</div>
                        <div className="resetCount">Resets: {this.state.resetCount}</div>
                        <div className="resetButton"><button onClick={this.resetGame}>Reset</button></div>
                    </div>
                    <Team 
                        teamName={this.props.visitingTeam.name}
                        logo={this.props.visitingTeam.logoSrc}
                        stats={this.state.visitingTeamStats}
                        shotsHandler={() => this.shotsOnGoal('visiting')}
                    />
                </div>
            </div>
        )
    }
}

function App(props) {
    let teamOne = {
        name: 'Mad Pandas',
        logoSrc: './images/home-logo.png'
    }

    let teamTwo = {
        name: 'Big Pawes',
        logoSrc: './images/visitor-logo.png'
    }

    let teamThree = {
        name: 'Angry Foxes',
        logoSrc: './images/home2-logo.png'
    }

    let teamFour = {
        name: 'Tough Bulldogs',
        logoSrc: './images/visitor2-logo.png'
    }

    return (
        <div>
            <Game venue="123 A Place" homeTeam={teamOne} visitingTeam={teamTwo} />
            <Game venue="123 Another Place" homeTeam={teamThree} visitingTeam={teamFour} />
        </div>
    )
}

ReactDOM.render(
    <App />, 
    document.querySelector('#root')
)