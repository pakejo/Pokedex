import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
import Sidebar from './Sidebar.js'
import Search from './Search.js'
import Grid from './Grid.js'

const HomePageContent = props => {

    console.log(props);

    return (
        <div className={props.showSidebar ? "d-flex toggled" : "d-flex"} id="wrapper">
            <Sidebar callback={props.generation} />

            <div id="page-content-wrapper">
                <button className="btn btn-primary" id="menu-toggle" onClick={props.clickHandler}>
                    {props.showSidebar
                        ? <i className="fas fa-angle-double-right"></i>
                        : <i className="fas fa-angle-double-left"></i>
                    }
                </button>

                <Search searchIn={props.searchPokemon} resultHandler={props.resultHandler} />

                <InfiniteScroll
                    dataLength={props.infiniteScrollData.length}
                    next={props.infiniteScrollNext}
                    hasMore={props.infiniteScrollhasMore}
                >
                    <Grid newItems={props.gridContent} />
                </InfiniteScroll>

            </div>
        </div>
    )
}

export default HomePageContent