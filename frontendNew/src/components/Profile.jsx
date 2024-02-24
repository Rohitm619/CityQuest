import React from "react";
import "../components/Profile.css";
const Profile = () => {
  return (
    <div className=" bg-black w-screen">
      <form>
        <div className="row">
          <div className="col-25">
            <label for="Societyname">Society Name</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="Societyname"
              name="Societyname"
              placeholder="Society Name.."
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="ChairpersonName">Chairperson Name</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="ChairpersonName"
              name="ChairpersonName"
              placeholder="Chairperson Name.."
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="Address">Address</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              id="subject"
              name="Address"
              placeholder="Address.."
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="PinCode">Pin Code</label>
          </div>
          <div className="col-75">
            <input
              type="Number"
              id="PinCode"
              name="PinCode"
              placeholder="Pin Code.."
            ></input>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="Noofflats">Number of flats</label>
          </div>
          <div className="col-75">
            <input
              type="number"
              id="Noofflats"
              name="Noofflats"
              placeholder="Number of flats.."
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="Age">Age</label>
          </div>
          <div className="col-75">
            <input type="number" id="Age" name="Age" placeholder="Age.." />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="lparcel">Land parcel (in acres)</label>
          </div>
          <div className="col-75">
            <input
              type="number"
              id="lparcel"
              name="lparcel"
              placeholder="Land parcel (in acres).."
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="4parking">Parking – 4 wheelers</label>
          </div>
          <div className="col-75">
            <input
              type="number"
              id="4parking"
              name="4parking"
              placeholder="Number of Parking – 4 wheelers.."
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="2parking">Parking – 2 wheelers</label>
          </div>
          <div className="col-75">
            <input
              type="number"
              id="2parking"
              name="2parking"
              placeholder="Number of Parking – 2 wheelers.."
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="Dustbins">Dustbins</label>
          </div>
          <div className="col-75">
            <input
              type="number"
              id="Dustbins"
              name="Dustbins"
              placeholder="Number of Dustbins.."
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="cctv">CCTVs</label>
          </div>
          <div className="col-75">
            <input
              type="number"
              id="cctv"
              name="cctv"
              placeholder="Number of CCTVs.."
            />
          </div>
        </div>

        <div className="row">
          <div className="col-25">
            <label for="Gym">Gym</label>
          </div>
          <div className="col-75">
            <select id="Gym" name="Gym">
              <option value="notavailable">Not Available</option>
              <option value="Poor">Poor</option>
              <option value="Avergae">Average</option>
              <option value="Good">Good</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="clubHouse">Club House</label>
          </div>
          <div className="col-75">
            <select id="clubHouse" name="clubHouse">
              <option value="notavailable">Not Available</option>
              <option value="Poor">Poor</option>
              <option value="Avergae">Average</option>
              <option value="Good">Good</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="Kidsplayarea">Kids Play Area</label>
          </div>
          <div className="col-75">
            <select id="Kidsplayarea" name="Kidsplayarea">
              <option value="notavailable">Not Available</option>
              <option value="Poor">Poor</option>
              <option value="Avergae">Average</option>
              <option value="Good">Good</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="SwimmingPool">Swimming Pool </label>
          </div>
          <div className="col-75">
            <select id="SwimmingPool" name="SwimmingPool">
              <option value="notavailable">Not Available</option>
              <option value="Poor">Poor</option>
              <option value="Avergae">Average</option>
              <option value="Good">Good</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="securitysystem">Security System</label>
          </div>
          <div className="col-75">
            <select id="securitysystem" name="securitysystem">
              <option value="notavailable">Not Available</option>
              <option value="Poor">Poor</option>
              <option value="Avergae">Average</option>
              <option value="Good">Good</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="powerbackup">Power Backup</label>
          </div>
          <div className="col-75">
            <select id="powerbackup" name="powerbackup">
              <option value="notavailable">Not Available</option>
              <option value="Poor">Poor</option>
              <option value="Avergae">Average</option>
              <option value="Good">Good</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="temple">Temple</label>
          </div>
          <div className="col-75">
            <select id="temple" name="temple">
              <option value="notavailable">Not Available</option>
              <option value="Poor">Poor</option>
              <option value="Avergae">Average</option>
              <option value="Good">Good</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="seniorcitizensitouts">Senior Citizen Sit Outs</label>
          </div>
          <div className="col-75">
            <select id="seniorcitizensitouts" name="seniorcitizensitouts">
              <option value="notavailable">Not Available</option>
              <option value="Poor">Poor</option>
              <option value="Avergae">Average</option>
              <option value="Good">Good</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="greenspaces">Green Spaces</label>
          </div>
          <div className="col-75">
            <select id="greenspaces" name="greenspaces">
              <option value="notavailable">Not Available</option>
              <option value="Poor">Poor</option>
              <option value="Avergae">Average</option>
              <option value="Good">Good</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="wasteSegregation ">Waste Segregation</label>
          </div>
          <div className="col-75">
            <select id="wasteSegregation" name="wasteSegregation">
              <option value="notavailable">Not Available</option>
              <option value="Poor">Poor</option>
              <option value="Avergae">Average</option>
              <option value="Good">Good</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="cleanliness">cleanliness</label>
          </div>
          <div className="col-75">
            <select id="cleanliness" name="cleanliness">
              <option value="notavailable">Not Available</option>
              <option value="Poor">Poor</option>
              <option value="Avergae">Average</option>
              <option value="Good">Good</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="SmokeDetector">Smoke Detector</label>
          </div>
          <div className="col-75">
            <select id="SmokeDetector" name="SmokeDetector">
              <option value="notavailable">Not Available</option>
              <option value="Poor">Poor</option>
              <option value="Avergae">Average</option>
              <option value="Good">Good</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label for="FireDuct">Fire Duct</label>
          </div>
          <div className="col-75">
            <select id="FireDuct" name="FireDuct">
              <option value="notavailable">Not Available</option>
              <option value="Poor">Poor</option>
              <option value="Avergae">Average</option>
              <option value="Good">Good</option>
            </select>
          </div>
        </div>
        <br />
        <div className="row">
          <div>
            <input type="submit" value="Submit" />
          </div>
          <div>
            <input type="submit" value="Cancel" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
