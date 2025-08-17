<?php
      require 'configConnection.php';
  
      if(!$con){
          die("Failed to connect to the server due to". mysqli_connect_error());
      }
      // echo "connection successful<br>"; 
      
      // Deletion
      if (isset($_GET['delete'])) {
        $sno = $_GET['delete'];
        $sql = "DELETE FROM `notes` WHERE `sno` = $sno";
        $result = mysqli_query($con, $sql);
        if ($result) {
          $delete = true;
        }
        else {
          echo "Failed to delete due to ". mysqli_error($con);
        }
      }

      // Updation and Insertion
      if ($_SERVER['REQUEST_METHOD'] == 'POST') {          
        if (isset($_POST['snoEdit'])) {
            // Update Record
  
            $sno = $_POST['snoEdit'];
            $title = $_POST['titleEdit'];
            $desc = $_POST['descEdit'];

            $title = str_replace("'","&#39;", $title);
            $title = str_replace("<","&lt;", $title) ;
            $title = str_replace("<","&lt;", $title) ;
            $title = str_replace(">","&gt;", $title) ;
            $desc = str_replace(">","&gt;", $desc) ;
            $desc = str_replace("'","&#39;", $desc);
            $desc = str_replace(">","&gt;", $desc) ;
            $desc = str_replace("<","&lt;", $desc) ;
            
            $sql = "UPDATE `notes` SET `title` = '$title', `description` = '$desc' WHERE `sno` = $sno";
            $result = mysqli_query($con, $sql);
    
            if ($result) {
              $update = true;
            }
            else{
              echo "<br>Failed to add due to ". mysqli_error($con). "<br><br>";
            }
        }
    
        else {
            // Insert the record
            $title = $_POST['title'];
            $desc = $_POST['desc'];

            $title = str_replace("'","&#39;", $title);
            $title = str_replace("<","&lt;", $title) ;
            $title = str_replace("<","&lt;", $title) ;
            $title = str_replace(">","&gt;", $title) ;
            $desc = str_replace(">","&gt;", $desc) ;
            $desc = str_replace("'","&#39;", $desc);
            $desc = str_replace(">","&gt;", $desc) ;
            $desc = str_replace("<","&lt;", $desc) ;

            $sql = "INSERT INTO `notes` (`title`, `description`, `date`) VALUES ('$title', '$desc', current_timestamp())"; 
            $result = mysqli_query($con, $sql);
    
            if ($result) {
              $insert = true;
            }
            else{
              echo "<br>Failed to add due to ". mysqli_error($con). "<br><br>";
            }
        }
      }
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" href="//cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.4.1/css/responsive.dataTables.min.css">
    
    <title>MyNotes - taking notes made easy (:</title>

  </head>
      
  <body class="bg-black">

    <!-- Modal -->
    <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">Edit Note</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body">
            <form action="index.php" method="post">
              <input type="hidden" name="snoEdit" id="snoEdit">
              <div class="mb-3">
                <label for="title" class="form-label my-2">Note Title</label>
                <input type="text" class="form-control my-2" id="titleEdit" name="titleEdit" aria-describedby="emailHelp"/>
              </div>
              <div class="mb-3">
                <label for="desc" class="form-label my-2">Note Description</label>
                <div class="form-group">
                  <textarea class="form-control my-2" id="descEdit" name="descEdit" rows="3"></textarea>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="Submit" class="btn btn-primary">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- About Modal -->
    <div class="modal fade" id="aboutModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-primary">About MyNotes</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <b><p class="text-info">MyNotes is a simple yet powerful web-based notepad application designed to help you create, edit, organize, and delete your notes with ease. Built with an intuitive interface and fast performance, it offers a seamless experience for managing your ideas, tasks, and reminders anytime, anywhere. Whether you’re jotting down quick thoughts or keeping detailed records, MyNotes keeps your information safe, accessible, and neatly organized, empowering you to stay productive and focused.</p></b>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <!-- This is NAVIGATION bar -->
    <nav class="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
      <a class="navbar-brand" href="#"> 
        <img src="logo.png" alt="PHP logo" height="30px" class="mx-2"> MyNotes
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse text-center" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active mx-3 d-md-none d-lg-inline-block" onclick="location.reload()">
            <a class="nav-link" href="">Home</a>
          </li>
          <li class="nav-item active mx-3 d-md-none d-lg-inline-block aboutBtn">
            <a class="nav-link" href="#">About</a>
          </li>
        </ul>
      </div>
    </nav>
  
    <!-- Alert if Insertion done -->
    <?php
      if ($insert == true) {
        echo '<div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Success! </strong> Your note has been added successfully.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>';
      }
    ?>
    
    <!-- Alert if Updation done -->
    <?php
      if ($update == true) {
        echo '<div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Success! </strong> Your note has been updated successfully.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
          </div>';
        }
    ?>

    <!-- Alert if Deletion done -->
    <?php
      if ($delete == true) {
        echo '<div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Success! </strong> Your note has been deleted successfully.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>';
      }
    ?>

    <div class="Main" id="main" style="width: 95%; margin: auto;">

    <!-- This is FORM -->
    <div class="container my-5">
      <h2 class="my-3">Add a Note</h2>
      <form action="index.php" method="post">
        <div class="mb-3">
          <label for="title" class="form-label my-2">Note Title</label>
          <!-- <input type="text" class="form-control my-2" id="title" name="title" aria-describedby="emailHelp" /> -->
            <input type="text" class="form-control form-control-lg my-2" id="title" name="title">
        </div>
        <div class="mb-3">
          <label for="desc" class="form-label my-2">Note Description</label>
          <div class="form-group">
          <!-- <textarea class="form-control my-2" id="desc" name="desc" rows="3"></textarea> -->
              <textarea class="form-control form-control-lg my-2" id="desc" name="desc" rows="3"></textarea>
          </div>
        </div>
        <!-- <button type="submit" class="btn btn-primary">Add Note</button> -->
          <button type="submit" class="btn btn-primary btn-lg">Add Note</button>
      </form>
    </div>
      
      <!-- This is TABLE -->
      <div class="table-responsive">
        <table class="table table-striped table-hover" id="myTable">
          <thead>
            <tr>
              <th scope="col">Sr.No</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody>
            <?php
              $sno = 0;
              $sql = "SELECT * FROM `notes`";
              $result = mysqli_query($con, $sql);
              $num = mysqli_num_rows($result);
              if ($num>0) { 
                while ($row = mysqli_fetch_assoc($result)) { 
                  $sno++;
                  echo "<tr>
                  <th scope='row'>".$sno. "</th>
                  <td>". $row['title']. "</td>
                  <td>". $row['description']. "</td>
                  <td style='padding: 8px 7px;'>
                    <div class='d-flex flex-column flex-md-row gap-1'>
                      <button class='edit btn btn-sm btn-primary mb-1 mb-md-0 mr-md-1' data-id='".$row['sno']."' data-title='".htmlspecialchars($row['title'])."' data-desc='".htmlspecialchars($row['description'])."'>Edit</button>
                      <button class='delete btn btn-sm btn-danger' data-id='".$row['sno']."'>Delete</button>
                    </div>
                  </td>
                  </tr>";
                }
              } 
              else { 
                echo "<h1 style='text-align: center;'>There is no data in table</h1>"; 
              }
            ?>
          </tbody>
        </table>
      </div>
    </div>

    <hr>
  </body>
  
  <!--  this is Links of jQuery, bootstrapJS and Bootstrap -->
  <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>  
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>        
  <script src="//cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"> </script>
  <script src="https://cdn.datatables.net/responsive/2.4.1/js/dataTables.responsive.min.js"></script>

  <!-- Data Table working design -->
  <script> 
  
  $(document).ready(function () {
      $('#myTable').DataTable({
        responsive: true,
        autoWidth: false,
        columnDefs: [
          { responsivePriority: 1, targets: 0 }, // Sr.No
          { responsivePriority: 2, targets: 1 }, // Title
          { responsivePriority: 3, targets: 2 }, // Description
          { responsivePriority: 4, targets: -1 } // Operations (last column)
        ]
      });
    });

    //  Modal handling for Edit button
    $(document).on('click', '.edit', function() {
      // Get data from button attributes
      var id = $(this).data('id');
      var title = $(this).data('title');
      var desc = $(this).data('desc');
      
      // Populate modal fields
      $('#snoEdit').val(id);
      $('#titleEdit').val(title);
      $('#descEdit').val(desc);
      
      // Show the modal
      $('#editModal').modal('show');
    });

    about = document.getElementsByClassName('aboutBtn')[0];
    about.addEventListener('click', ()=> {
      $('#aboutModal').modal('toggle')
    })

    // deletes = document.getElementsByClassName('delete');
      $(document).on('click', '.delete', function(e) {
        sno = e.target.id.substr(1,);
          /* TODO: 
          1) in the name of security, create an authentication form and provide access to MYNotes only for the authorized users.
          2) Resolve page reloading errors .
          */
          e.preventDefault();
          var sno = $(this).data('id');
          // if ((confirm("Tula hi note nakki delete karaychi ahe ka?!"))) {
          if (confirm("Do you really want to delete this?!")) {
              window.location = 'index.php?delete=' + sno;
          }
          else{
            console.log("no");
          }
        });

    $('#myModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus')
    })
  </script>
</html>
