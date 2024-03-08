$('#domain-search').submit(function(e) {
    e.preventDefault(); // Prevent the default form submission
  
    var domain = $('#domain-field').val();
    var apiKey = '4e581dcb1ede41980ee3879d4448dbc17206da84';
    var url = `https://api.hunter.io/v2/domain-search?domain=${domain}&api_key=${apiKey}`;
  
    $.ajax({
      url: url,
      type: 'GET',
      success: function(data) {
        var resultsDiv = $('#results');
        resultsDiv.html(''); // Clear previous results
  
        if (data.data.emails.length === 0) {
          resultsDiv.html(`<div class="alert alert-warning" role="alert">
              No results were found for ${domain}, please try another domain.
          </div>`);
          return; // Exit the function early
        }
  
        // If not empty, proceed to display the emails
        $.each(data.data.emails, function(index, email) {
          var content = `
              <div class="card mb-3">
                  <div class="card-body row">
                  <div class="col">
                      <h5 class="card-title">${email.first_name || ''} ${email.last_name || ''}</h5>
                      <h6 class="email-address">Email: ${email.value}</h6>
                  </div>
                  <div class="col">
          `;
  
          if (email.position) {
            content += `<p class="card-text">Position: ${email.position}</p>`;
          }
          if (email.seniority) {
              content += `<p class="card-text">Seniority: ${email.seniority}</p>`;
          }
          if (email.department) {
              content += `<p class="card-text">Department: ${email.department}</p>`;
          }
          if (email.linkedin) {
              content += `<p class="card-text">LinkedIn: <a href="${email.linkedin}" target="_blank">${email.linkedin}</a></p>`;
          }
          if (email.twitter) {
              content += `<p class="card-text">Twitter: <a href="https://twitter.com/${email.twitter}" target="_blank">@${email.twitter}</a></p>`;
          }
          if (email.phone_number) {
              content += `<p class="card-text">Phone: ${email.phone_number}</p>`;
          }
  
          content += `
                  </div>
                  <div class="col">
                    <div class="d-grid gap-2 col-6 mx-auto">
                      <button class="btn btn-primary send-to-crm" type="button" data-email-index="${index}">Send To CRM</button>
                    </div>
                  </div>
             </div>
          </div>`;
  
          resultsDiv.append(content); // Append each email info
        });
  
        // Attach click event listener to the Send To CRM buttons
        $('.send-to-crm').on('click', function() {
          var emailIndex = $(this).data('email-index');
          var emailData = data.data.emails[emailIndex];
  
          var postData = {
              source: 9,
              status: 2,
              phonenumber:`${emailData.phone_number}`,
              company:`${data.data.organization}`,
              domain: `${data.data.domain}`,
              title: `${emailData.position}`,
              first_name: `${emailData.first_name}`,
              last_name: `${emailData.last_name}`,
              email: emailData.value
  
          };
  
 