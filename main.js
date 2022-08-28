"use strict";
window.onload = async _ => {
    async function GetStateTree() {
        const jsonUrl = new URLSearchParams(window.location.search).get("jsonUrl");
        try {
            var response = await fetch(jsonUrl);
        } catch (e) {
            response = { ok: false };
        }
        while (!response.ok) {
            const jsonInput = prompt("Please provide JSON URL or JSON itself");
            try {
                return JSON.parse(jsonInput);
            } catch (e) {
                try {
                    response = await fetch(jsonInput);
                } catch (e) {
                    
                }
            }
        }
        return await response.json();
    }
    const state = await GetStateTree();
    const startView = document.createElement("div");
    document.body.append(startView);
    const createView = (state, previousView) => {
        const stateView = document.createElement("div");
        stateView.append(state.description, ...state.actions.map(action => {
            const button = document.createElement("button");
            button.textContent = action.description;
            button.onclick = _ => createView(action.state, stateView);
            return button;
        }));
        previousView.replaceWith(stateView);
    }
    createView(state, startView);
}