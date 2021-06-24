# -*- mode: ruby -*-
# vi: set ft=ruby :

$vagrantBoxIp = "192.168.33.75"
$vagrantHosts = "tracking.local api.tracking.local admin.tracking.local"

Vagrant.configure("2") do |config|

    config.vm.box = "scotch/box-pro-nginx"
    config.vm.hostname = "tracking.local"
    config.vm.network "forwarded_port", guest: 80, host: 8080
    config.vm.network "private_network", ip: $vagrantBoxIp
    config.vm.synced_folder ".", "/var/www", :mount_options => ["dmode=777", "fmode=777"]

    # Optional NFS. Make sure to remove other synced_folder line too
    #config.vm.synced_folder ".", "/var/www", :nfs => { :mount_options => ["dmode=777","fmode=666"] }

    config.vm.provision "shell", path: "2ambox/provision.sh"
	config.vm.provision "shell", path: "2ambox/configure-nginx.sh", run: "always", privileged: true

    config.vm.provision "shell", run: "always", privileged: false, inline: <<-EOF
      echo "Your vagrant machine is loaded at hosts config: #{$vagrantBoxIp} #{$vagrantHosts}"
      echo "Please add this configuration in your hosts file located on /etc/hosts on Linux od Windows/System32/drivers/etc/hosts on Windows."
    EOF
end