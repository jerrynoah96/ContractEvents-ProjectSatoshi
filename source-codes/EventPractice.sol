// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.8.0;

contract EventPractice{
    // declare the event
    //use indexed keyword to be able to filter transaction based on the indexed parameter
    //note that you cant index more than 3 parameters in an event, so choose base on priority
   event added(address indexed caller, uint x, uint y, uint indexed result);
    
    //a variable result   
    uint result;
    
    
    function add(uint _x, uint _y) public {
      result = _x + _y;

      // fire the event above to let the app know the function was called:
      //ensure the name is the same and input parameters in same order as it is in the event declared
      
        emit added (msg.sender, _x, _y, result);
    }
    
    //function to view Result
    function viewResult() public view returns(uint){
        return result;
    }
}