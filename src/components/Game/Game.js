import React from 'react';
import './Game.css'
//import ApproveNFTView from '../ApproveNFTView'

function Game() {
    return (
        <>    
            <div id="horse1" class="horse standRight">
                <div class="rider">
                    <div class="head">
                    </div>
                    <div class="body">
                    </div>
                </div>
            </div>


            <div id="horse2" class="horse standRight">
                <div class="rider">
                    <div class="head">
                    </div>
                    <div class="body">
                    </div>
                </div>
            </div>


            <div id="horse3" class="horse standRight">
                <div class="rider">
                    <div class="head">
                    </div>
                    <div class="body">
                    </div>
                </div>
            </div>


            <div id="horse4" class="horse standRight">
                <div class="rider">
                    <div class="head">
                    </div>
                    <div class="body">
                    </div>
                </div>
            </div>
           
            <div className="track">
                <div id="startline">
                </div>

                <div className="inner">
                    <div id="bet">
                        <p>You currently have <span id="funds">100</span></p>
                        <label>Bet Amount (£)</label>
                        <input type="number" id="amount" value="0"></input>
                        <label>Bet on horse:</label>
                        <select id="bethorse">
                            <option value="1">White</option>
                            <option value="2">Blue</option>
                            <option value="3">Green</option>
                            <option value="4">Brown</option>
                        </select>
                        <label>Number of lap</label>
                        <input type="number" id="num_lap" name="num_lap" value="1"></input>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Game;