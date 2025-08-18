//$.connection.hub.logging = false;
//inserted to Monitoring Tool

let traders_assigned_matches = {}
let traders_assigned_match_names = {}
let traders_assigned_matches_for_edit_menu = []
let tournaments_short_names = {}

//let prev_statuses = {}

let selected_sport;
let selectedItems; //holds traders/competitions user selected in popup menu
tracked_ids = []
tracked_match_names = [] // for dashboard fast load
let scan_started = false

//const eventState = new Set()

// let popupContainer = document.getElementById('custom-popup-container');

// if (!popupContainer) {
//   popupContainer = document.createElement('div');
//   popupContainer.id = 'custom-popup-container';
//   popupContainer.style.position = 'fixed';
//   popupContainer.style.zIndex = '10000';
//   popupContainer.style.pointerEvents = 'none'; // allow clicks to go through if needed
//   document.body.appendChild(popupContainer);
// }

//let targetElement = document.querySelector('.currentTime');
// let targetElement = document.getElementById('userBar');

// if (targetElement){
//     const rect = targetElement.getBoundingClientRect();
//     // popupContainer.style.left = `${rect.left}px`;
//     // popupContainer.style.top = `${rect.top + rect.height}px`;


//     const leftPercent = (rect.left / window.innerWidth) * 100;
//     const topPercent = ((rect.top + rect.height) / window.innerHeight) * 100;
//     popupContainer.style.left = `${leftPercent}vw`; // viewport width units
//     popupContainer.style.top = `${topPercent}vh`;   // viewport height units


// }


const callback = (mutationList, observer) => {
        
    for (const mutation of mutationList) {
        //
        this_cycle_between_points_alerts = []
        
        if (mutation.addedNodes.length == 5 || mutation.addedNodes.length == 7) {
            //because monitored-data-grid with everyhting is always 3rd element
            //
                            
            
            if (selected_sport == "Ice Hockey"){
                table = mutation.addedNodes[5]
                info_line = mutation.addedNodes[3].firstElementChild
            } else{
                table = mutation.addedNodes[3]
                info_line = mutation.addedNodes[1].firstElementChild
            }
            //table = mutation.addedNodes[3]
            
            rows_to_array = Array.from(table.children[0].children)
            
            number_of_skipped_matches = 0
            total_amount_of_matches = 0 
            
            rows_to_array.forEach((element, index) => {

                let condition_met = false
                
                try{
               
                dataset = element.dataset
                if (dataset["eventId"] != undefined){
                    if (selected_sport == "Tennis"){
                        
                        trader_name = element.children[19].textContent;
                        //is_match_opened = element.children[17].firstElementChild.className //'suspensionState stateTrading'
                        try{
                            match_status = element.children[0].children[3].innerText.trim()

                            
                        } catch(e){
                            match_status = ""
                            //console.log(dataset["eventId"],"should be hidden")
                            
                            if (element.children[1].className == "tennis left fixtureProblem" || element.children[1].className == "tennis left fixtureProblem tennis-coverage"){
                                total_amount_of_matches += 1
                                
                                element.style.display = "none"
                                
                                try{
                                    rows_to_array[index+1].style.display = "none"
                                    rows_to_array[index+2].style.display = "none"

                                    


                                
                                }catch(error){
                                    
                                }

                                number_of_skipped_matches += 1
                            }




                        }
                        
                        //prev_status = prev_statuses[dataset["eventId"]]
                        
                        p1_name = element.children[1].innerText
                        //console.log(trader_name, is_match_opened, match_status)
                        //if (trader_name == "N/A"){

                        //console.log(p1_name, "match is finished :",isMatchFinished(element, rows_to_array, index))

                        // ==== && match_status != "NotStarted"

                        if (trader_name == "N/A" && match_status != "NotStarted" && (match_status == "PointInProgress" || match_status == "BetweenPoints" || match_status == "WarmingUp" || match_status == "ShortDelay")){  
                                                    
                            //is_already_there = document.getElementById(dataset["eventId"])

                            if (match_status == "BetweenPoints"){
                                is_match_finished = isMatchFinished(element, rows_to_array, index)
                                if (is_match_finished){
                                    condition_met = false
                                } else {
                                    condition_met = true
                                }
                            } else{
                                condition_met = true
                            }

                            //console.log(p1_name,"investifgating2",condition_met)


                            // if (match_status == "BetweenPoints"){

                            //     if (!eventState.has(dataset["eventId"])){
                            //         eventState.add(dataset["eventId"])
                            //         this_cycle_between_points_alerts.push(dataset["eventId"])
                            //         //continue to next mutation
                            //         return                                                                                                    
                            //     } else {
                            //         //popup
                            //     }


                            // }
                            
                            // if (!is_already_there){
                            //     // Create a new popup
                            //     const popup = document.createElement('div');
                            
                            //     //popup.textContent = "N/A in " + dataset["eventId"];
                            //     popup.id = dataset["eventId"]
                            
                            //     popup.style.background = 'yellow';
                            //     popup.style.position = 'relative';
                            //     //popup.style.padding = '5px 10px';
                            //     popup.style.padding = '5px 30px';
                            //     popup.style.border = '1px solid black';
                            //     popup.style.borderRadius = '4px';
                            //     popup.style.marginTop = '5px'; // spacing between popups
                            //     popup.style.pointerEvents = 'auto';
                            //     popup.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';



                            //     // Create the close (X) button
                            //     const closeBtn = document.createElement('span');
                            //     closeBtn.textContent = '×';
                            //     closeBtn.style.position = 'absolute';
                            //     closeBtn.style.top = '5px';
                            //     closeBtn.style.right = '8px';
                            //     closeBtn.style.cursor = 'pointer';
                            //     closeBtn.style.fontWeight = 'bold';
                            //     closeBtn.style.fontSize = '16px';
                            //     closeBtn.style.color = '#333';

                            //     // Handle click to remove the popup
                            //     closeBtn.onclick = () => popup.remove();

                            //     // Add elements to popup
                            //     popup.appendChild(closeBtn);

                            //     //popup.appendChild(document.createTextNode("N/A in " + p1_name));
                            //     // Add a line break
                            //     //popup.appendChild(document.createElement('br'));

                            //     const notificationText = document.createElement('div');
                            //     notificationText.textContent = "N/A in " + p1_name
                            //     notificationText.style.textAlign = 'center';

                            //     popup.appendChild(notificationText);

                            //     //popup.appendChild(document.createElement('br'));


                            //     const link = document.createElement('a');
                            //     href = element.children[0].children[1].firstElementChild.href
                            //     link.href = href;
                            //     link.textContent =  dataset["eventId"];
                            //     link.target = '_blank'; // optional: open in new tab

                            //     link.style.display = 'block';
                            //     link.style.textAlign = 'center';
                    
                            //     // link.style.textDecoration = 'none';
                            //     // link.style.color = 'black'; // or any color you want                            

                            //     // Append the new popup inside the container
                            //     popup.appendChild(link);
                            //     popupContainer.appendChild(popup);
                            // }
                        
                        }
                        
                        //prev_statuses[dataset["eventId"]] = match_status


                    }


                    total_amount_of_matches += 1

                        //if (dataset["eventId"] == "11519394"){
                        //
                        //console.log("p1_name", p1_name)
                        //console.log("p1_name condition", p1_name, condition_met)
                        if(condition_met){

                            element.children[0].style.border = "4px solid red";
                            element.children[19].style.border = "4px solid red";

                            //console.log("no trader",p1_name)


                        }else if (tracked_ids.includes(dataset["eventId"].toString()) === false){
                            element.style.display = "none"
                            
                            try{
                                rows_to_array[index+1].style.display = "none"
                                rows_to_array[index+2].style.display = "none"

                                number_of_skipped_matches += 1


                            
                            }catch(error){
                                
                            }

                    
                        }                       



                        // if (tracked_ids.includes(dataset["eventId"].toString()) === false){
                        //     element.style.display = "none"
                        //     try{
                        //     rows_to_array[index+1].style.display = "none"
                        //     rows_to_array[index+2].style.display = "none"

                        //     number_of_skipped_matches += 1


                            
                        //     }catch(error){
                                
                        //     }

                    
                        // }
                    
                 
                    
                    
                    }

                }catch(e){
                    console.warn(e)
                    return
                }

                
            });


            //info_line = mutation.addedNodes[1].firstElementChild
            //.firstChild
            
            let rightAlignedText = document.createElement("span");
            number_of_matches = total_amount_of_matches - number_of_skipped_matches
            //rightAlignedText.textContent = `| Filter activated | Total:${ma}`;
            rightAlignedText.textContent = `| Total filtered: ${number_of_matches}`;
    
            info_line.appendChild(rightAlignedText);
            rightAlignedText.style.marginLeft = "10px"

            rightAlignedText.style.color = "red"; // Set text color to red
            rightAlignedText.style.fontWeight = "bold";
                
    
    };
    
    }

}


const observer = new MutationObserver(callback);

const hide_notif = (mutationList, notif_observer) => {
        
    for (const mutation of mutationList) {
            //
        if (mutation.type === "childList" & mutation.addedNodes.length > 0 & mutation.target.id == "noty_topCenter_layout_container" ) {
            mutation.addedNodes[0].hidden = true
            
            //
            //
            let text = mutation.addedNodes[0].innerText
            const match = text.match(/\((\d+)\)/);
            
            if (match) {
                if (tracked_ids.includes(match[1]) === false){
                    //mutation.addedNodes[0].hidden = true
                    //
                } else{
                    mutation.addedNodes[0].hidden = false
                }
                
                //
            }

                    
        }
    
    }
  
  }

  
  let config_notification_container = { childList: true, subtree: true }
  const notif_observer = new MutationObserver(hide_notif)
  notif_observer.observe(document.body, config_notification_container);


function hide_ids(tracked_ids){

    //TDO?
    observer.disconnect()
    
    let config_navigation_tab = {
        attributes: true, 
        childList: true, 
        subtree: false,
        characterData: false
    };

            let elements_ = document.querySelectorAll('[id = "monitor-data"]');
                
            for (let element_ of elements_){
                    observer.observe(element_, config_navigation_tab); 
                }

            }

            


// function createPopup(output) {
//     // Create and add CSS styles
//     const style = document.createElement('style');
//     style.textContent = `
//         .popup {
//             position: fixed;
//             top: 50%;
//             left: 50%;
//             transform: translate(-50%, -50%);
//             background-color: #fff;
//             border: 1px solid #ccc;
//             box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//             z-index: 10000;
//             padding: 10px;
//             max-height: 400px;
//             overflow-y: auto;
//         }

//         .popup ul {
//             list-style-type: none; /* Remove bullet points */
//             padding: 0; /* Remove default padding */
//         }

//         .popup li {
//             padding: 5px;
//             cursor: pointer;
//         }

//         .popup li.selected {
//             background-color: #007bff; /* Change this to your desired color */
//             color: white;
//         }

//         .popup button {
//             margin-top: 10px;
//         }
//     `;
//     document.head.appendChild(style); // Append the style to the head

//     // Create the popup container
//     const popup = document.createElement('div');
//     popup.className = 'popup'; // Add class for styling

//     // Create a list to display the output
//     const list = document.createElement('ul');

//     output.sort();
//     output.forEach(item => {
//         const listItem = document.createElement('li');
//         listItem.textContent = item;

//         // Add click event to each list item
//         listItem.addEventListener('click', () => {
//             listItem.classList.toggle('selected');
//         });

//         list.appendChild(listItem);
//     });

//     popup.appendChild(list);
//     document.body.appendChild(popup);

//     // Create a button to save the selected items
//     const saveButton = document.createElement('button');
//     saveButton.textContent = 'Save Selections';
    
//     saveButton.addEventListener('click', () => {

//         //observer.disconnect()
        
//         selectedItems = Array.from(list.children)
//             .filter(item => item.classList.contains('selected'))
//             .map(item => item.textContent);

//         

//         // Optionally, remove the popup after saving
//         document.body.removeChild(popup);

//         tracked_ids_temp = []
//         tracked_match_names_temp = []

//         for (item of selectedItems){
//             tracked_ids_temp.push(...traders_assigned_matches[item])
//             tracked_match_names_temp.push(...traders_assigned_match_names[item])
//         }



        
//         tracked_ids = tracked_ids_temp
//         tracked_match_names = tracked_match_names_temp




        
//         //saving selectedItems in storage
//         chrome.storage.sync.set({ selectedItems: selectedItems, tracked_ids:tracked_ids, tracked_match_names:tracked_match_names});
        
//         
//         hide_ids(tracked_ids)
//     });

//     popup.appendChild(saveButton);
// }





// function createPopup(output, message_type) {
//     // Create and add CSS styles
//     const style = document.createElement('style');
//     style.textContent = `
//         .popup {
//             position: fixed;
//             top: 50%;
//             left: 50%;
//             transform: translate(-50%, -50%);
//             background-color: #fff;
//             border: 1px solid #ccc;
//             box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//             z-index: 10000;
//             padding: 10px;
//             width: 300px;
//             max-height: 500px;
//             display: flex;
//             flex-direction: column;
//         }

//         .popup ul {
//             list-style-type: none; /* Remove bullet points */
//             padding: 0; /* Remove default padding */
//             margin: 0;
//             overflow-y: auto;
//             flex-grow: 1; /* Allows the list to take up available vertical space */
//             max-height: 500px; /* Adjust to control the list height */
//         }

//         .popup li {
//             padding: 5px;
//             cursor: pointer;
//         }

//         .popup li.selected {
//             background-color: #007bff; /* Change this to your desired color */
//             color: white;
//         }

//         #saveButtonContainer {
//             display: flex;
//             justify-content: center; /* Center the buttons together */
//             gap: 10px; /* Add a small gap between the buttons */
//             padding-top: 10px;
//             background-color: white;
   
//         }

//         .popup button {
//             padding: 3px 6px;
//             cursor: pointer;
//         }

//         #saveButton, #closeButton {
//             min-width: 100px; /* Ensure buttons are wide enough */
//         }
//     `;
//     document.head.appendChild(style); // Append the style to the head

//     // Create the popup container
//     const popup = document.createElement('div');
//     popup.className = 'popup'; // Add class for styling

//     // Create a list to display the output
//     const list = document.createElement('ul');

//     //



//     output.sort();
//     output.forEach(item => {
//         const listItem = document.createElement('li');
//         listItem.textContent = item;
        
//         // Add click event to each list item
//         listItem.addEventListener('click', () => {
//             listItem.classList.toggle('selected');
//         });
        
//         if (message_type === "editMode" && traders_assigned_matches_for_edit_menu.includes(item)){
//             listItem.classList.add("selected");
//         }

//         list.appendChild(listItem);
//     });

//     popup.appendChild(list);

//     // Create a div for the buttons and keep it outside of the scrollable list
//     const saveButtonContainer = document.createElement('div');
//     saveButtonContainer.id = 'saveButtonContainer';

//     // Create the Save button
//     const saveButton = document.createElement('button');
//     saveButton.id = 'saveButton';
//     saveButton.textContent = 'Save';

//     saveButton.addEventListener('click', () => {

// //------------
//                     selectedItems = Array.from(list.children)
//                     .filter(item => item.classList.contains('selected'))
//                     .map(item => item.textContent);

//                     //

//                     // Optionally, remove the popup after saving
//                     document.body.removeChild(popup);

//                     tracked_ids_temp = []
//                     tracked_match_names_temp = []

//                     traders_assigned_matches_for_edit_menu = []
//                     for (item of selectedItems){

//                         // item is what was selected in the list

//                         traders_assigned_matches_for_edit_menu.push(item)

//                         //so for every chosen trader (or competition) in the list respective match_id will be found in traders_assigned_matches[trader] and filled to tracked_ids_temp

                        
//                         tracked_ids_temp.push(...traders_assigned_matches[item])  //  traders_assigned_matches = { trader : match_id}
//                         tracked_match_names_temp.push(...traders_assigned_match_names[item])
                    
//                     }

//                     // both tracked_ids and tracked_match_names will be saved in storage

//                     tracked_ids = tracked_ids_temp //  tracked_ids is used by "hide_ids" function
//                     tracked_match_names = tracked_match_names_temp  // tracked_match_names if for dashboard only

//                     //

//                     //



//                     //saving selectedItems in storage
//                     chrome.storage.sync.set({ selectedItems: selectedItems, tracked_ids:tracked_ids, tracked_match_names:tracked_match_names});

//                     //
//                     hide_ids(tracked_ids)

//                     if (scan_started == false){
//                         setInterval(get_and_process_data, 600000)
//                         scan_started = true
//                     }

// //----









//     });

//     // Create the Close button
//     const closeButton = document.createElement('button');
//     closeButton.id = 'closeButton';
//     closeButton.textContent = 'Close';

//     closeButton.addEventListener('click', () => {
//         // Remove the popup from the document
//         document.body.removeChild(popup);
//     });

//     // Add both buttons to the button container
//     saveButtonContainer.appendChild(saveButton);
//     saveButtonContainer.appendChild(closeButton);

//     popup.appendChild(saveButtonContainer);
//     document.body.appendChild(popup);
// }


// top: 50%;
// left: 50%;
// transform: translate(-50%, -50%);

// style.textContent = `
// .popup {
//     position: fixed;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     background-color: #fff;
//     border: 1px solid #ccc;
//     box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//     z-index: 2147483647;
//     padding: 10px;
//     width: 300px;
//     max-height: 500px;
//     display: flex;
//     flex-direction: column;
// }


function createPopup(output, message_type) {
    // Create and add CSS styles
    const style = document.createElement('style');
    style.textContent = `
        .popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            border: 1px solid #ccc;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 2147483647;
            padding: 10px;
            width: 300px;
            max-height: 500px;
            display: flex;
            flex-direction: column;
        }

        .popup ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
            overflow-y: auto;
            flex-grow: 1;
            max-height: 400px;
        }

        .popup li {
            padding: 5px;
            cursor: pointer;
        }

        .popup li.selected {
            background-color: #007bff;
            color: white;
        }

        #saveButtonContainer {
            display: flex;
            justify-content: center;
            gap: 10px;
            padding-top: 10px;
            background-color: white;
        }

        .popup button {
            padding: 3px 6px;
            cursor: pointer;
        }

        #saveButton, #closeButton {
            min-width: 100px;
        }

        .search-input {
            width: 100%;
            padding: 5px;
            margin-bottom: 10px;
            box-sizing: border-box;
        }
    `;
    document.head.appendChild(style);

    // Create the popup container
    const popup = document.createElement('div');
    popup.className = 'popup';

    // Add search input
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'search-input';
    searchInput.placeholder = 'Search...';
    popup.appendChild(searchInput);

    // Create the list
    const list = document.createElement('ul');
    popup.appendChild(list);

    // Track selected items
    const selectedItemsSet = new Set(
        message_type === "editMode" 
            ? traders_assigned_matches_for_edit_menu.filter(item => output.includes(item)) 
            : []
    );

    // Function to render list items
    function renderList(items) {
        list.innerHTML = ''; // Clear current list
        items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;

            // Apply selected class if item is in selectedItemsSet
            if (selectedItemsSet.has(item)) {
                listItem.classList.add('selected');
            }

            // Add click event to toggle selection
            listItem.addEventListener('click', () => {
                listItem.classList.toggle('selected');
                if (listItem.classList.contains('selected')) {
                    selectedItemsSet.add(item);
                } else {
                    selectedItemsSet.delete(item);
                }
            });

            list.appendChild(listItem);
        });
    }

    // Initial render with sorted output
    const sortedOutput = [...output].sort();
    renderList(sortedOutput);

    // Add search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredItems = sortedOutput.filter(item => 
            item.toLowerCase().includes(searchTerm)
        );
        renderList(filteredItems);
    });

    // Create a div for the buttons
    const saveButtonContainer = document.createElement('div');
    saveButtonContainer.id = 'saveButtonContainer';

    // Create the Save button
    const saveButton = document.createElement('button');
    saveButton.id = 'saveButton';
    saveButton.textContent = 'Save';

    saveButton.addEventListener('click', () => {
        // Convert Set to Array for saving
        selectedItems = Array.from(selectedItemsSet);

        document.body.removeChild(popup);

        tracked_ids_temp = [];
        tracked_match_names_temp = [];
        traders_assigned_matches_for_edit_menu = [];

        for (item of selectedItems){

            // item is what was selected in the list
            
            traders_assigned_matches_for_edit_menu.push(item)

            //so for every chosen trader (or competition) in the list respective match_id will be found in traders_assigned_matches[trader] and filled to tracked_ids_temp

            
            tracked_ids_temp.push(...traders_assigned_matches[item])  //  traders_assigned_matches = { trader : match_id}
            tracked_match_names_temp.push(...traders_assigned_match_names[item])
        
        }

        // both tracked_ids and tracked_match_names will be saved in storage

        tracked_ids = tracked_ids_temp //  tracked_ids is used by "hide_ids" function
        tracked_match_names = tracked_match_names_temp  // tracked_match_names if for dashboard only

        //

        //
        
        

        //saving selectedItems in storage
        chrome.storage.sync.set({ selectedItems: selectedItems, tracked_ids:tracked_ids, tracked_match_names:tracked_match_names});

        //
        hide_ids(tracked_ids)

        if (scan_started == false){
            setInterval(get_and_process_data, 600000) //1 second = 1000 milliseconds
            //setInterval(get_and_process_data, 15000)
            scan_started = true
        }

    });

    // Create the Close button
    const closeButton = document.createElement('button');
    closeButton.id = 'closeButton';
    closeButton.textContent = 'Close';

    closeButton.addEventListener('click', () => {
        document.body.removeChild(popup);
    });

    // Add buttons to container
    saveButtonContainer.appendChild(saveButton);
    saveButtonContainer.appendChild(closeButton);
    popup.appendChild(saveButtonContainer);

    // Add popup to document
    document.body.appendChild(popup);

    const rect = popup.getBoundingClientRect();
    popup.style.top = rect.top + 'px';
    popup.style.left = rect.left + 'px';
    popup.style.transform = 'none';
}



// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.result) {
//         

//         htmlString  = message.result
//         filter = message.filter
        
//         //-----------------------------------------------
//         // const blob = new Blob([htmlString], { type: 'text/html' });

//         // // Create a link element
//         // const link = document.createElement('a');
//         // link.href = URL.createObjectURL(blob);
//         // link.download = 'myPage.html'; // Specify the filename for download
        
//         // // Append the link to the body (required for Firefox)
//         // document.body.appendChild(link);
        
//         // // Programmatically click the link to trigger the download
//         // link.click();
        
//         // // Clean up by revoking the object URL and removing the link
//         // URL.revokeObjectURL(link.href);
//         // document.body.removeChild(link);  
        
        
        
//         //-------------------------------------------------------


        
        
        
//         //restore_all
        
        
        
//         tempDiv = document.createElement('div')
//         tempDiv.innerHTML = htmlString;
        
//         rows = tempDiv.getElementsByTagName("tr")
//         rowsArray = Array.from(rows);

//         

//         let position = 0
//         if (filter == "Trader"){
//             position = 8
//         } else if (filter == "Competition"){
//             position = 2
//         } else if (filter == "Sport"){
//             position = 1
//         }
        
//         // trader_position = 8
//         // sport_position = 1
//         // competition_position = 2

//         rowsArray.forEach((row, index) => {

//             if (index == 2){
//                 number_of_children = row.children.length

//                 //means dashboard is there TDB
//                 if (number_of_children == 10){
//                     if (filter == "Trader"){
//                         position = position + 1
//                     }
//                 }


//             }

//             else if (index >3){
//                 columns = row.children
//                 columnsArray = Array.from(columns);
//                 // 0 = eventId
//                 // 1 = Sport
//                 // 2 = Tourn
//                 // 3 match
//                 //4 time
//                 // 9  trader               in tennis 8? because on dashboard


//                 match_id = columnsArray[0].id

//                 try{

//                         if (filter == "Trader"){
//                             trader = columnsArray[position].getElementsByTagName('div')[0].innerText.trim()
//                         } else {
//                             trader = columnsArray[position].innerText.trim()
//                         }

//                         
//                         
                
//                         if (trader in traders_assigned_matches){
//                             //
//                             traders_assigned_matches[trader].push(match_id)
//                         }else{
//                             traders_assigned_matches[trader] = [match_id]
//                         }
//                     }catch(error){

//                     }
//             }



//             //
//         });

//         
//         createPopup(Object.keys(traders_assigned_matches))
      
//     }
// });
  


// Listener for the message from popup.js that receives messages  when user clicks on Apply button 
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  
    // for popup.js to understand if it needs to inject script or script is already running, after that popup.js will send either 
    //justParameters or firstStart
    if (message.type === 'are_you_alive') {
        //
        sendResponse({ scriptInjected: true });
    
    // after popup.js sent 'checkScriptInjected' message and understood that script is running then it sends just parameters when user clicks Apply button
    } 
    //     else if (message.type === 'justParameters'){

    //     sport = message.sport
    //     filter = message.filter

    // }
      
    // means that script.js was just injected and it is the FIRST RUN
    else if(message.type === 'firstStart' || message.type === 'editMode'){


        if ( traders_assigned_matches_for_edit_menu.length == 0 && message.type === "editMode"){
            chrome.storage.sync.get(['selectedItems'], function (data) {
                if (data.selectedItems) {
                    traders_assigned_matches_for_edit_menu = data.selectedItems
        
                }    
              });
        }
        
        
        //
        sport = message.sport
        filter = message.filter

        //here we scrape selected Sport in monitoring tool

        // Find all input elements with id="sport"
        const inputElements = document.querySelectorAll('input[id="sport"]');

        // Find the input element with checked=true
        checkedElement = Array.from(inputElements).find(element => element.checked === true);

        selected_sport = checkedElement.labels[0].innerText
    


        //now we pass all info:scraped sport and filter to background where info will be fetched from OST absed on sent paramteres
        //
        chrome.runtime.sendMessage({ type: 'fetch', sport: selected_sport, detailed_type:message.type}, function (response) {

            
    //----------main code--------------------------------------

                if ("error" in response){
                    
                }
                else if (response.result) {
                    //

                    htmlString  = response.result
         
                    
                    //-----------------------------------------------
                    // const blob = new Blob([htmlString], { type: 'text/html' });

                    // // Create a link element
                    // const link = document.createElement('a');
                    // link.href = URL.createObjectURL(blob);
                    // link.download = 'myPage.html'; // Specify the filename for download
                    
                    // // Append the link to the body (required for Firefox)
                    // document.body.appendChild(link);
                    
                    // // Programmatically click the link to trigger the download
                    // link.click();
                    
                    // // Clean up by revoking the object URL and removing the link
                    // URL.revokeObjectURL(link.href);
                    // document.body.removeChild(link);  
                    
                    
                    
                    //-------------------------------------------------------


                    tempDiv = document.createElement('div')
                    tempDiv.innerHTML = htmlString;
                    
                    rows = tempDiv.getElementsByTagName("tr")
                    rowsArray = Array.from(rows);

                    //
                    //
                    let position = 0
                    if (filter == "Trader"){
                        position = 8
                    } else if (filter == "Competition"){
                        position = 2
                    } else if (filter == "Sport"){
                        position = 1
                    }
                    
                    // trader_position = 8
                    // sport_position = 1
                    // competition_position = 2


                    traders_assigned_matches = {}


                    rowsArray.forEach((row, index) => {

                        if (index == 2){
                            number_of_children = row.children.length

                            //means dashboard is there TDB
                            if (number_of_children == 10){
                                if (filter == "Trader"){
                                    position = position + 1
                                }
                            }


                        }

                        else if (index >3){
                            columns = row.children
                            columnsArray = Array.from(columns);
                            // 0 = eventId
                            // 1 = Sport
                            // 2 = Tourn
                            // 3 match
                            //4 time
                            // 9  trader               in tennis 8? because on dashboard


                            try{
                                match_id = columnsArray[0].id
                                match_name = columnsArray[3].childNodes[2].textContent.slice(1).trim().replace("  "," ");
                            }catch(error){
                                //
                                return;  // Skip to the next iteration
                            }

                            //check feed
                            // if ($0.children[5].innerText == "BG\n"){
                            //     if (!$0.children[6].firstElementChild.checked){
                            //         //not good
                            //     }
                            // } else{
                            //     if ($0.children[6].firstElementChild.checked){
                            //         //not good
                            //     }                                
                            // }

                            try{
                                    //
                                    if (filter == "Trader"){
                                        trader = columnsArray[position].getElementsByTagName('div')[0].innerText.trim()
                                    } else { //torunmanets
                                        trader = columnsArray[position].innerText.trim()

                                        

                                        if (selected_sport == "Tennis"){

                                            adjusted_competition_name = tournaments_short_names[trader]

                                            if (!adjusted_competition_name){ //first time start
                                                 //if undefined
                                                                                           
                                                if (trader.includes("Qualification") || trader.includes("Doubles")){
                                                    adjusted_competition_name = trader.trim().split(' ').slice(0, -1).join(' ');
                                                    tournaments_short_names[trader] = adjusted_competition_name

                                                    trader = adjusted_competition_name
                                                
                                                } else { //normal tournmanet, creating for the first time
                                                    tournaments_short_names[trader] = trader
                                                }
                                            }else{ // adjusted_competition_name from tournaments_short_names was extracted properly
                                                trader = adjusted_competition_name
                                            }
                                            
                                            //console.log(adjusted_competition_name, trader)
                                            //trader = adjusted_competition_name
                                        }                                     
                                    }

                                    //
                                    
                                    // based on traders_assigned_matches popup will be formed
                                    if (trader in traders_assigned_matches){
                                        //
                                        traders_assigned_matches[trader].push(match_id)
                                        traders_assigned_match_names[trader].push(match_name)
                                    }else{
                                        traders_assigned_matches[trader] = [match_id]
                                        traders_assigned_match_names[trader] = [match_name]
                                    }
                                }catch(error){

                                }
                        }



                        //
                    });

                    //

                    list_of_traders = Object.keys(traders_assigned_matches)
                    if (list_of_traders.length == 0){
                        loginContainer = tempDiv.querySelector('.loginContainer')
                        if (loginContainer){
                            //loginPopup()
                            alert("You need firstly to login to Monitoring Tool to start using the extension.")
                        }

                    } else {
                        createPopup(list_of_traders, message.type)
                    }
                
                }




        });


    }

    else if(message.type === 'firstStartFromLoad'){
        filter = message.filter

        //here we scrape selected Sport in monitoring tool

        // Find all input elements with id="sport"
        const inputElements = document.querySelectorAll('input[id="sport"]');

        // Find the input element with checked=true
        checkedElement = Array.from(inputElements).find(element => element.checked === true);

        selected_sport = checkedElement.labels[0].innerText


        chrome.storage.sync.get(['selectedItems','tracked_ids', 'tracked_match_names'], function (data) {
            if (data.selectedItems) {
                selectedItems = data.selectedItems

            }

            if (data.tracked_ids) {
                tracked_ids = data.tracked_ids
            }

            if (data.tracked_match_names) {
                tracked_match_names = data.tracked_match_names
            }

            hide_ids(tracked_ids)
            get_and_process_data()

            if (scan_started == false){
                setInterval(get_and_process_data, 600000)
                scan_started = true
            }
        
          });




    }

});



//notification_nodes = document.querySelectorAll('.noty_text')
//document.querySelectorAll('.noty_text')[0].textContent

//difference with first run is that here we dont need to show popup windows with list of traders to user, "tracked_ids" holds info about matches to show/hide

function get_and_process_data(){
//
chrome.runtime.sendMessage({ type: 'fetch', sport: selected_sport, detailed_type: null}, function (response) {
    //

    //----------main code--------------------------------------
                    if ("error" in response){
                        
                    }
                    else if (response.result) {
                        
                        
                        htmlString  = response.result
             
                        
                        //-----------------------------------------------
                        // const blob = new Blob([htmlString], { type: 'text/html' });
    
                        // // Create a link element
                        // const link = document.createElement('a');
                        // link.href = URL.createObjectURL(blob);
                        // link.download = 'myPage.html'; // Specify the filename for download
                        
                        // // Append the link to the body (required for Firefox)
                        // document.body.appendChild(link);
                        
                        // // Programmatically click the link to trigger the download
                        // link.click();
                        
                        // // Clean up by revoking the object URL and removing the link
                        // URL.revokeObjectURL(link.href);
                        // document.body.removeChild(link);  
                        
                        
                        
                        //-------------------------------------------------------
    
    
                        tempDiv = document.createElement('div')
                        tempDiv.innerHTML = htmlString;
                        
                        rows = tempDiv.getElementsByTagName("tr")
                        rowsArray = Array.from(rows);
    
                        //
                 
                        let position = 0
                        if (filter == "Trader"){
                            position = 8
                        } else if (filter == "Competition"){
                            position = 2
                        } else if (filter == "Sport"){
                            position = 1
                        }
                        
                        // trader_position = 8
                        // sport_position = 1
                        // competition_position = 2

                        traders_assigned_matches = {}
    
                        rowsArray.forEach((row, index) => {
    
                            if (index == 2){
                                number_of_children = row.children.length
    
                                //means dashboard is there TDB
                                if (number_of_children == 10){
                                    if (filter == "Trader"){
                                        position = position + 1
                                    }
                                }
    
    
                            }
    
                            else if (index >3){
                                columns = row.children
                                columnsArray = Array.from(columns);
                                // 0 = eventId
                                // 1 = Sport
                                // 2 = Tourn
                                // 3 match
                                //4 time
                                // 9  trader               in tennis 8? because on dashboard
    
                                try{
                                    match_id = columnsArray[0].id
                                    match_name = columnsArray[3].childNodes[2].textContent.slice(1).trim().replace("  "," ");
                                }catch(error){
                                    //
                                    return;  // Skip to the next iteration
                                }
    
                                try{
                                        //
                                        if (filter == "Trader"){
                                            trader = columnsArray[position].getElementsByTagName('div')[0].innerText.trim()
                                        } else { //competition
                                            //trader = columnsArray[position].innerText.trim()
                                            //===================
                                            trader = columnsArray[position].innerText.trim()
                                            
                                            
                                            if (selected_sport == "Tennis"){
                                                
                                                adjusted_competition_name = tournaments_short_names[trader]
                                                
                                                if (!adjusted_competition_name){ //if undefined
                                                                                               
                                                    if (trader.includes("Qualification") || trader.includes("Doubles")){
                                                        adjusted_competition_name = trader.trim().split(' ').slice(0, -1).join(' ');
                                                        tournaments_short_names[trader] = adjusted_competition_name
                                                    } else {
                                                        tournaments_short_names[trader] = trader
                                                    }
                                                }
                                                
                                                trader = adjusted_competition_name
                                                
                                            }  
                                        }
    
                                        //
                                        //
                                
                                        if (trader in traders_assigned_matches){
                                            //
                                            traders_assigned_matches[trader].push(match_id)
                                            traders_assigned_match_names[trader].push(match_name)
                                        }else{
                                            traders_assigned_matches[trader] = [match_id]
                                            traders_assigned_match_names[trader] = [match_name]
                                        }
                                    }catch(error){
                                        
                                    }
                            }
    
    
    
                            //
                        });
    
                        
                        
                        list_of_traders = Object.keys(traders_assigned_matches)
                        
                        //if "list_of_traders" is empty probably log out? need to check
                        if (list_of_traders.length == 0){
                            loginContainer = tempDiv.querySelector('.loginContainer')
                            if (loginContainer){
                                //loginPopup()
                                alert("You need firstly to login to Monitoring Tool to start using the extension.")
                            }
    
                        } else{
                            //update "traders_assigned_matches"
                            // tracked_ids = []
                            // tracked_match_names = []
                            
                            tracked_ids_temp = []
                            tracked_match_names_temp = []
                            // tracked_ids is formed, based on which matches will be hidden in observer callback through includes
                            for (item of selectedItems){ //error here   selectedItems is not iterable

                                if (item in traders_assigned_matches){
                                    tracked_ids_temp.push(...traders_assigned_matches[item])
                                    tracked_match_names_temp.push(...traders_assigned_match_names[item])
                                }
                                
                            }
                            
     
                            // tracked_match_names is formed, based on which matches will be hidden in observer callback through includes

                    
                            
                            tracked_ids = tracked_ids_temp
                            tracked_match_names = tracked_match_names_temp
                            
                            //


                            //make unwanted not visible
                            hide_ids(tracked_ids)
                        }
                    
                    }
    
    
    
    
            });
        }


//         // Start the interval 10 minutes (600,000 milliseconds) from now
// setTimeout(() => {
//     // Set an interval that runs every 10 minutes
//     setInterval(get_and_process_data, 600000);
//   }, 600000);


function isSetFinished(p1_games, p2_games) {
  if (isNaN(p1_games) || isNaN(p2_games)) return false;

  const diff = Math.abs(p1_games - p2_games);
  const maxGames = Math.max(p1_games, p2_games);

  if (maxGames < 6) return false;

  if (maxGames === 6 && diff >= 2) return true;  // Normal set
  if (maxGames === 7) return true;               // Tiebreak set

  return false;
}

function isMatchFinished(element, rows_to_array, index) {
  const p1 = [
    parseInt(element.children[4].innerText),
    parseInt(element.children[5].innerText),
    parseInt(element.children[6].innerText)
  ];

  const p2 = [
    parseInt(rows_to_array[index+1].children[3].innerText),
    parseInt(rows_to_array[index+1].children[4].innerText),
    parseInt(rows_to_array[index+1].children[5].innerText)
  ];

  let p1_sets_won = 0;
  let p2_sets_won = 0;

  for (let i = 0; i < 3; i++) {
    if (!isSetFinished(p1[i], p2[i])) continue;

    if (p1[i] > p2[i]) p1_sets_won++;
    else if (p2[i] > p1[i]) p2_sets_won++;
  }

  return p1_sets_won === 2 || p2_sets_won === 2;
}
