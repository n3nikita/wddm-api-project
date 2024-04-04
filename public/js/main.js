$('#domain-search').submit(function(e) {
    e.preventDefault(); // Prevent the default form submission
  
    var domain = $('#domain-field').val();
    var apiKey = '0048259197c47ba9437623ea337d8dda37766563';
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
  
          $.ajax({
              url: 'https://zipwebs.com/wp-json/uap/v2/uap-52508-52509',
              type: 'POST',
              headers: {
                  'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiSHVtYmVyIiwibmFtZSI6Ikh1bWJlciIsIkFQSV9USU1FIjoxNzA4NTk5NjQxfQ.5uz85AuQHejSSDFBcLb9qncrPaYsS82_y501YIVRuPQ',
                  'Content-Type': 'application/json'
              },
              data: JSON.stringify(postData),
              success: function(response) {
                  console.log('Data sent successfully to CRM.');
                  // Optionally, show a success message to the user
              },
              error: function(xhr, status, error) {
                  console.error('Error sending data to CRM:', error);
                  // Optionally, show an error message to the user
              }
          });
          var $this = $(this);
        
        // Disable the button immediately upon click to prevent multiple sends
        $this.prop('disabled', true);
  
        // Wait for 2 seconds before changing the button
        setTimeout(function() {
            // Create a new <p> element with the desired text
            var $p = $('<p></p>').text('Lead Sent to CRM');
            
            // Replace the clicked button with the new <p> element
            // You could also choose to hide the button and insert the <p> element next to it, depending on your needs
            $this.replaceWith($p);
        }, 2000); // 2000 milliseconds = 2 seconds
        });
      },
      error: function(xhr, status, error) {
        $('#results').html(`<div class="alert alert-danger" role="alert">Error fetching data: ${error}</div>`);
      }
    });
  });
  
  
  
   
  const OPENAI_API_KEY = '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';
  
  const endpoint = 'https://api.openai.com/v1/chat/completions';
  const data = {
    model: "gpt-3.5-turbo-0613",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant. Writing emails on behalf of Jerome Ricketts, who is the lead seo and backlink manager at Zip Webs, a leading digital marketing agency"
      },
      {
        role: "user",
        content: "Write me an impressive outreach email the will reach out to .${emailData.first_name} from ${data.data.organization} that has access to the domain name ${data.data.domain}"
      }
    ]
  };
  
  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });